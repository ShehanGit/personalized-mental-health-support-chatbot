const express = require('express');
const { port } = require('./config/config');
const chatRoutes = require('./routes/chatRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // This must be present

// Routes
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});