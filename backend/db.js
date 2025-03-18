// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

module.exports = mongoose;
