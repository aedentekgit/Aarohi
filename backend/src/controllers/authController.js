const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        // 1. Find User
        const user = await User.findByEmail(email);
        console.log('User search result:', user ? 'Found' : 'Not Found');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({
            message: 'Database connection failed. Please ensure your DB_HOST is correct and remote access is enabled.'
        });
    }
};

exports.getMe = async (req, res) => {
    // req.user is set by authMiddleware
    res.json(req.user);
};
