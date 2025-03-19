// services/chatService.js
const axios = require('axios');
const { openaiApiKey } = require('../config/config');
const ChatMessage = require('../models/ChatMessage');

const crisisKeywords = ['kill myself', 'end my life', 'don’t want to live', 'suicide', 'hurt myself'];

// Save a chat message in the database
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

// Retrieve conversation history for a given session (sorted chronologically)
const getConversationHistory = async (sessionId) => {
    return await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
};

const getChatResponse = async (sessionId, userId, userMessage) => {
    // Check for crisis keywords first
    const lowerMessage = userMessage.toLowerCase();
    const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isCrisis) {
        const crisisResponse = "I'm really worried about you. Please reach out to someone who can help. Here's a helpline: 1-800-273-8255.";
        await saveChatMessage(sessionId, userId, userMessage, crisisResponse, true);
        return { response: crisisResponse, isCrisis: true };
    }
    
    try {
        // Retrieve the conversation history
        const history = await getConversationHistory(sessionId);
        
        // Build the messages array for the OpenAI API
        const messages = [];
        
        // Add a system message as the initial prompt
        messages.push({
            role: 'system',
            content: 'You are a compassionate mental health companion. Provide supportive, general advice without diagnosing or prescribing medication.'
        });
        
        // Add previous messages from the conversation history
        // Each ChatMessage contains both userMessage and chatResponse.
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
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',  // Ensure that your model is correct and accessible
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
