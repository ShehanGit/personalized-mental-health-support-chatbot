// models/ChatMessage.js
const mongoose = require('../db');

const ChatMessageSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatSession', required: true },
    userMessage: { type: String, required: true },
    chatResponse: { type: String, required: true },
    isCrisis: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
