const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulated data
let users = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 }
];

// Basic GET endpoint
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Delayed response endpoint (for testing async operations)
app.get('/api/users/delayed', (req, res) => {
    setTimeout(() => {
        res.json(users);
    }, 2000);
});

// Stream data endpoint (for testing stream operators)
app.get('/api/stream', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let count = 0;
    const interval = setInterval(() => {
        if (count < 5) {
            res.write(JSON.stringify({ data: count++ }) + '\n');
        } else {
            clearInterval(interval);
            res.end();
        }
    }, 1000);
});

// Search endpoint (for testing debounce/distinctUntilChanged)
app.get('/api/users/search', (req, res) => {
    const query = req.query.q?.toLowerCase();
    if (!query) {
        return res.json(users);
    }
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query)
    );
    res.json(filtered);
});

// Error simulation endpoint (for testing error handling)
app.get('/api/error', (req, res) => {
    res.status(500).json({ error: 'Simulated server error' });
});

// POST endpoint (for testing HTTP POST)
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// WebSocket-like endpoint (for hot observable demo)
app.get('/api/updates', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify({ timestamp: new Date() })}\n\n`);
    }, 1000);

    req.on('close', () => {
        clearInterval(interval);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
