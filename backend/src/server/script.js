const express = require('express');
const app = express();
const cors = require('cors');
const port = 4444;
const routes = require('../routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`SERVER RUNNING: http://localhost:${port}`)
})