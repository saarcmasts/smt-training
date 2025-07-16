import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    const q = req.query;

    const isOdd = q.input % 2 !== 0;

    res.json({
        isOdd
    });
});

// app.get('/:input', (req, res) => {
//     const q = req.params;
//     res.send('From Get Endpoint (P): ' + q.input);
// });

// app.post('/', (req, res) => {
//     const q = req.body;
//     res.send('From Post Endpoint (B): ' + q.input);
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});