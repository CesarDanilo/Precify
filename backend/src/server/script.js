const express = require('express');
const app = express();
const port = 4444;
const routes = require('../routes');

app.use('/api', routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`SERVIDOR RUNING: http://localhost:${port}`)
})