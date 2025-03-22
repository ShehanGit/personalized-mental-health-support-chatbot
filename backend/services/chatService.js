// services/chatService.js
const axios = require('axios');
const { openaiApiKey } = require('../config/config');
const ChatMessage = require('../models/ChatMessage');

const crisisKeywords = [
  'kill myself',
  'end my life',
  'don’t want to live',
  'suicide',
  'hurt myself'
];

const saveChatMessage = async (sessionId, userId, userMessage, chatResponse, isCrisis) => {
  try {
    const chatMessage = new ChatMessage({
      sessionId,
      userId,
      userMessage,
      chatResponse,
      isCrisis
    });
    await chatMessage.save();
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
};

const getConversationHistory = async (sessionId) => {
  return await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
};

function buildSystemPrompt(userProfile) {
  if (!userProfile) {
    return `You are a compassionate mental health companion. 
Provide supportive, general advice without diagnosing or prescribing medication.`;
  }
  
  const {
    nickname,
    ageRange,
    preferredLanguage,
    primaryConcern,
    goal,
    checkInFrequency,
    moodTriggers,
    copingStyle,
    tone,
    busyTimes,
    freeTimeActivities,
    sleep,
    supportPreference,
    emergencyContact,
    boundaries,
    theme,
    textSize
  } = userProfile;

  return `
You are a compassionate mental health companion. Your role is to offer supportive, thoughtful, and general advice tailored to the user's needs. Remember:
- Do not diagnose or prescribe medication.
- Always respond in an empathetic, warm, and encouraging tone.
- Keep your responses concise, friendly, and sensitive to the user's context.

User Context:
- **Nickname**: ${nickname || 'User'}
- **Age Range**: ${ageRange || 'Unknown'}
- **Preferred Language**: ${preferredLanguage || 'Not specified'}
- **Primary Concern**: ${primaryConcern || 'General mental health'}
- **Desired Outcome**: ${goal || 'Feel better'}
- **Check-In Frequency**: ${checkInFrequency || 'No preference'}
- **Mood Triggers**: ${moodTriggers || 'Not specified'}
- **Preferred Coping Style**: ${copingStyle || 'Not specified'}
- **Tone Preference**: ${tone || 'Warm'}
- **Busy Times**: ${busyTimes || 'Unknown'}
- **Leisure Activities**: ${freeTimeActivities || 'Not specified'}
- **Sleep Pattern**: ${sleep || 'Unknown'}
- **Support Preference**: ${supportPreference || 'No preference'}
- **Emergency Contact**: ${emergencyContact || 'Not provided'}
- **Topics to Avoid**: ${boundaries || 'No specific boundaries'}
- **Theme Preference**: ${theme || 'Default theme'}
- **Text Size Preference**: ${textSize || 'Standard'}

Use this context to personalize all interactions. Tailor your responses to be supportive, understanding, and focused on helping the user achieve a sense of calm and well-being.
`.trim();
}

const getChatResponse = async (sessionId, userId, userMessage, userProfile) => {
  const lowerMessage = userMessage.toLowerCase();
  const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (isCrisis) {
    const crisisResponse = "I'm really worried about you. Please reach out to someone who can help. Here's a helpline: 1-800-273-8255.";
    await saveChatMessage(sessionId, userId, userMessage, crisisResponse, true);
    return { response: crisisResponse, isCrisis: true };
  }
  
  try {
    const history = await getConversationHistory(sessionId);
    const messages = [];
    const systemPrompt = buildSystemPrompt(userProfile);
    messages.push({
      role: 'system',
      content: systemPrompt
    });
    
    history.forEach((msg) => {
      messages.push({ role: 'user', content: msg.userMessage });
      messages.push({ role: 'assistant', content: msg.chatResponse });
    });
    
    messages.push({ role: 'user', content: userMessage });
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const chatResponse = response.data.choices[0].message.content.trim();
    await saveChatMessage(sessionId, userId, userMessage, chatResponse, false);
    return { response: chatResponse, isCrisis: false };
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch response from OpenAI');
  }
};

module.exports = { getChatResponse };
