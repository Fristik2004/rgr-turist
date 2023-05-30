const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
    // Обробка вашого запиту
    res.json({ message: 'Hello from Express.js on Netlify Functions!' });
});

module.exports = app;