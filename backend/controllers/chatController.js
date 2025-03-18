// controllers/chatController.js
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');
const { getChatResponse } = require('../services/chatService');

// Start a new chat session
const startNewSession = async (req, res) => {
    try {
        const { sessionName } = req.body;
        const userId = req.user.userId;

        const newSession = new ChatSession({ userId, sessionName });
        await newSession.save();

        res.status(201).json({ sessionId: newSession._id, message: "New chat session created" });
    } catch (error) {
        res.status(500).json({ error: "Error creating chat session" });
    }
};

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { sessionId, message } = req.body;
        if (!sessionId || !message) return res.status(400).json({ error: "Session ID and message are required" });

        const chatResponse = await getChatResponse(sessionId, message);
        res.status(200).json(chatResponse);
    } catch (error) {
        res.status(500).json({ error: "Error processing message" });
    }
};

// Retrieve all chat sessions for a user
const getUserChatSessions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving chat sessions" });
    }
};

module.exports = { startNewSession, sendMessage, getUserChatSessions };
