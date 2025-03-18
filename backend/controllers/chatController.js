// chatController.js
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');
const { getChatResponse } = require('../services/chatService');

const startNewSession = async (req, res) => {
    try {
        const { userId, sessionName } = req.body;

        if (!userId) return res.status(400).json({ error: 'User ID is required' });

        const newSession = new ChatSession({ userId, sessionName });
        await newSession.save();

        res.status(201).json({ sessionId: newSession._id, message: 'New chat session created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating chat session' });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { sessionId, message } = req.body;

        if (!sessionId || !message) {
            return res.status(400).json({ error: 'Session ID and message are required' });
        }

        const chatResponse = await getChatResponse(sessionId, message);
        res.status(200).json(chatResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error processing message' });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const chatMessages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
        res.status(200).json(chatMessages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving chat history' });
    }
};

module.exports = { startNewSession, sendMessage, getChatHistory };
