const axios = require('axios');
const { openaiApiKey } = require('../config/config');

const crisisKeywords = ['kill myself', 'end my life', 'don’t want to live', 'suicide', 'hurt myself'];

const getChatResponse = async (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));

  if (isCrisis) {
    return {
      response: "I'm really worried about you. I’m not a professional, but I strongly encourage you to reach out to someone who can help. Here’s a helpline you can call: 1-800-273-8255 (National Suicide Prevention Lifeline in the US). You’re not alone.",
      isCrisis: true
    };
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        // Changed model to match your working frontend code
        model: 'gpt-4o-mini',
        // Use a similar message structure as in your ChatBot component
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate mental health companion. Provide supportive, general advice without diagnosing or prescribing medication. Keep responses empathetic and safe.'
          },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return {
      response: response.data.choices[0].message.content.trim(),
      isCrisis: false
    };
  } catch (error) {
    console.error('Open AI API error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch response from Open AI: ' + error.message);
  }
};

module.exports = { getChatResponse };
