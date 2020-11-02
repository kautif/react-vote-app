require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();
const port = process.env.PORT;

const db = require('./models');
const handler = require('./handlers');
const router = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.get('/', (req, res) => {
    res.json({greet: 'hello'});
})
app.use('/api/auth', routes.auth);

app.use(handler.statusHandler);

app.use(handler.errorHandler);

app.listen(port, console.log(`Listening on port ${port}`));