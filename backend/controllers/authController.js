const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Ensure environment variables are loaded

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// User Signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ message: "User registered successfully", token, userId: newUser._id });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Error registering user", details: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};

// Ensure the functions are exported correctly
module.exports = { signup, login };
