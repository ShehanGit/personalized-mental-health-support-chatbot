// controllers/chatController.js
const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');
const { getChatResponse } = require('../services/chatService');

// Create a new chat session for the authenticated user
const startNewSession = async (req, res) => {
    try {
        const { sessionName } = req.body;
        const userId = req.user.userId;

        const newSession = new ChatSession({ userId, sessionName });
        await newSession.save();

        res.status(201).json({ sessionId: newSession._id, message: "New chat session created" });
    } catch (error) {
        res.status(500).json({ error: "Error creating chat session", details: error.message });
    }
};

// Process a new message within a chat session
const sendMessage = async (req, res) => {
    try {
        // Extract sessionId, message, and userProfile from the request body
        const { sessionId, message, userProfile } = req.body;
        const userId = req.user.userId;

        if (!sessionId || !message) {
            return res.status(400).json({ error: "Session ID and message are required" });
        }

        // Log the received userProfile for debugging purposes
        console.log('sendMessage received userProfile:', userProfile);

        // Pass userProfile along to getChatResponse for personalized responses
        const chatResponse = await getChatResponse(sessionId, userId, message, userProfile);
        res.status(200).json(chatResponse);
    } catch (error) {
        res.status(500).json({ error: "Error processing message", details: error.message });
    }
};

// Retrieve all chat sessions for the authenticated user
const getUserChatSessions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving chat sessions", details: error.message });
    }
};

// Retrieve all messages for a specific chat session
const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.userId;

        // Verify that the session exists and belongs to the user
        const session = await ChatSession.findOne({ _id: sessionId, userId });
        if (!session) {
            return res.status(404).json({ error: "Chat session not found" });
        }

        // Retrieve all messages for the session, sorted by creation time (oldest first)
        const messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving chat history", details: error.message });
    }
};

module.exports = { startNewSession, sendMessage, getUserChatSessions, getChatHistory };
