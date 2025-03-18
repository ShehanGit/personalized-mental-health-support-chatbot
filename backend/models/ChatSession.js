// models/ChatSession.js
const mongoose = require('../db');

const ChatSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionName: { type: String, default: "New Chat" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatSession', ChatSessionSchema);
