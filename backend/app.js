const express = require('express');
const { port } = require('./config/config');
const testRoutes = require('./routes/testRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/test', testRoutes);

// Error handling middleware (place last)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});