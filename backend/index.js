const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });
const port = process.env.PORT;
const mongoDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const axios = require('axios');

var cors = require('cors');

app.use(
    cors({
        origin: true,
    })
);

mongoDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (for development)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', userRouter);

app.get('/search/shows', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Missing query parameter' });
        }

        const tvMazeResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        const shows = tvMazeResponse.data;

        res.status(200).json(shows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})