// services/chatService.js
const axios = require('axios');
const { openaiApiKey } = require('../config/config');
const ChatMessage = require('../models/ChatMessage');

const crisisKeywords = ['kill myself', 'end my life', 'don’t want to live', 'suicide', 'hurt myself'];

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
    console.log('Chat message saved.');
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
};

const getConversationHistory = async (sessionId) => {
  return await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
};

/**
 * Build a system prompt that uses userProfile details.
 * Customize this content based on your personal data structure.
 */
function buildSystemPrompt(userProfile) {
  if (!userProfile) {
    // Fallback if no userProfile is provided
    console.log('No userProfile found. Using default system prompt.');
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

  console.log('Received userProfile:', userProfile);

  const systemPrompt = `
You are a compassionate mental health companion. Provide supportive, general advice without diagnosing or prescribing medication.
Here is some personal context about the user:

- Nickname: ${nickname || 'User'} 
- Age Range: ${ageRange || 'Unknown'}
- Preferred Language: ${preferredLanguage || 'Not specified'}
- Primary Concern: ${primaryConcern || 'General mental health'}
- Goal: ${goal || 'Feel better'}
- Check-In Frequency: ${checkInFrequency || 'No preference'}
- Mood Triggers: ${moodTriggers || 'Not specified'}
- Coping Style: ${copingStyle || 'Not specified'}
- Tone Preference: ${tone || 'Warm'}
- Busy Times: ${busyTimes || 'Unknown'}
- Free Time Activities: ${freeTimeActivities || 'Not specified'}
- Sleep Pattern: ${sleep || 'Unknown'}
- Support Preference: ${supportPreference || 'No preference'}
- Emergency Contact: ${emergencyContact || 'Not provided'}
- Boundaries: ${boundaries || 'No specific boundaries'}
- Theme Preference: ${theme || 'Default theme'}
- Text Size: ${textSize || 'Standard'}

Use this context to personalize the conversation, but do not diagnose or prescribe. Keep responses empathetic and supportive.
`.trim();

  // Log the final system prompt for debugging
  console.log('Final system prompt:\n', systemPrompt);

  return systemPrompt;
}

/**
 * getChatResponse
 * @param {String} sessionId 
 * @param {String} userId 
 * @param {String} userMessage 
 * @param {Object} userProfile - Additional user data for personalization
 */
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
    
    // Build the messages array for the OpenAI API
    const messages = [];
    
    // Use the user's profile data to build a custom system prompt
    const systemPrompt = buildSystemPrompt(userProfile);

    // Add the system message as the initial prompt
    messages.push({
      role: 'system',
      content: systemPrompt
    });
    
    // Add previous messages from conversation history
    history.forEach((msg) => {
      messages.push({
        role: 'user',
        content: msg.userMessage
      });
      messages.push({
        role: 'assistant',
        content: msg.chatResponse
      });
    });
    
    // Append the current user message as the latest message
    messages.push({
      role: 'user',
      content: userMessage
    });
    
    // Now call the OpenAI API with the entire conversation context
    console.log('Sending messages to OpenAI:\n', JSON.stringify(messages, null, 2));

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', // Ensure the model name is correct
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
