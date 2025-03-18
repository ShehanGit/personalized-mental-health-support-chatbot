// routes/chatRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { startNewSession, sendMessage, getUserChatSessions } = require('../controllers/chatController');

const router = express.Router();

router.post('/new-session', authMiddleware, startNewSession);
router.post('/message', authMiddleware, sendMessage);
router.get('/sessions', authMiddleware, getUserChatSessions);

module.exports = router;
