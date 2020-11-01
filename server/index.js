require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

const db = require('./models');

const handler = require('./handlers');

app.listen(port, console.log(`Listening on port ${port}`));
// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.get('/', (req, res) => {
    res.json({greet: 'hello'});
})

app.use(cors);

app.use(handler.statusHandler);

app.use(handler.errorHandler);