require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5500', // Match your frontend URL
    credentials: true
}));

// Rate limiting to prevent abuse (50 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // Limit each IP to 50 requests per windowMs
});
app.use(limiter);

// Secret key for JWT (store in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret';

// Mock user authentication (in a real app, use a database like MongoDB)
const users = {
    'user@example.com': 'password123'
};

// Login endpoint (for simplicity, basic auth; in production, use OAuth or more secure methods)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (users[email] && users[email] === password) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Endpoint to generate AI-powered subtopics (secure with authentication)
app.post('/api/subtopics', authenticateToken, async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        // Use OpenAI API (or another AI service) to generate subtopics
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            throw new Error('OpenAI API key not configured');
        }

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Use a suitable model
            messages: [
                { role: 'system', content: 'You are a helpful assistant that generates concise, relevant subtopics for any given topic.' },
                { role: 'user', content: `Generate 2-5 concise, relevant subtopics for: ${topic}` }
            ],
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const subtopics = response.data.choices[0].message.content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        res.json({ subtopics });
    } catch (error) {
        console.error('Error generating subtopics:', error);
        res.status(500).json({ error: 'Failed to generate subtopics' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});