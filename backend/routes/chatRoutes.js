// chatRoutes.js
const express = require('express');
const { startNewSession, sendMessage, getChatHistory } = require('../controllers/chatController');

const router = express.Router();

router.post('/new-session', startNewSession);
router.post('/message', sendMessage);
router.get('/history/:sessionId', getChatHistory);

module.exports = router;
