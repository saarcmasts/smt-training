import express from 'express';
import https from 'https';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration

app.use(cors());

// API endpoint to fetch random users
app.get('/random-users', (req, res) => {
    https.get('https://jsonplaceholder.typicode.com/users', (apiResponse) => {
        let data = '';

        apiResponse.on('data', (chunk) => {
            data += chunk;
        });

        apiResponse.on('end', () => {
            try {
                const users = JSON.parse(data);
                res.json(users);
            } catch (error) {
                console.error('JSON Parse Error:', error);
                res.status(500).json({ error: 'Failed to parse API response' });
            }
        });
    }).on('error', (err) => {
        console.error('API Request Error:', err);
        res.status(500).json({ error: 'Failed to fetch from randomuser API' });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});