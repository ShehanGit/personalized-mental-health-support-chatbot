// chatService.js
const axios = require('axios');
const { openaiApiKey } = require('../config/config');
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');

const crisisKeywords = ['kill myself', 'end my life', 'don’t want to live', 'suicide', 'hurt myself'];

const saveChatMessage = async (sessionId, userMessage, chatResponse, isCrisis) => {
    try {
        const chatMessage = new ChatMessage({
            sessionId,
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

const getChatResponse = async (sessionId, userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isCrisis) {
        const crisisResponse = "I'm really worried about you. Please reach out to someone who can help. Here's a helpline: 1-800-273-8255.";
        await saveChatMessage(sessionId, userMessage, crisisResponse, true);
        return { response: crisisResponse, isCrisis: true };
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a compassionate mental health companion.' },
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

        const chatResponse = response.data.choices[0].message.content.trim();
        await saveChatMessage(sessionId, userMessage, chatResponse, false);
        return { response: chatResponse, isCrisis: false };
    } catch (error) {
        console.error('OpenAI API error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch response from OpenAI');
    }
};

module.exports = { getChatResponse };
