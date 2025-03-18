const { getChatResponse } = require('../services/chatService');

const sendMessage = async (req, res, next) => {
    try {
        console.log('Request body:', req.body); // Debug log
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }

        const { response, isCrisis } = await getChatResponse(message);
        res.status(200).json({
            response,
            isCrisis
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { sendMessage };