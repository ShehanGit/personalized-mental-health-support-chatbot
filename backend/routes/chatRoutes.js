// routes/chatRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { 
    startNewSession, 
    sendMessage, 
    getUserChatSessions,
    getChatHistory
} = require('../controllers/chatController');

const router = express.Router();

// Route to create a new chat session (requires authentication)
router.post('/new-session', authMiddleware, startNewSession);

// Route to send a message in a chat session (requires authentication)
router.post('/message', authMiddleware, sendMessage);

// Route to retrieve all chat sessions for the authenticated user
router.get('/sessions', authMiddleware, getUserChatSessions);

// Route to retrieve the chat history (all messages) for a specific session
router.get('/history/:sessionId', authMiddleware, getChatHistory);

module.exports = router;
