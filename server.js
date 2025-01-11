const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Mock user database
const users = {
    admin: 'password123',
};

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Protected route (example)
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('Unauthorized access attempt'); // Log unauthorized attempts
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: `Welcome, ${decoded.username}` });
    } catch (err) {
        console.error('Invalid token:', err.message); // Log token errors
        res.status(401).json({ message: 'Invalid token' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
