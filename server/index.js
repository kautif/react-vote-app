require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const handler = require('./handlers');

const app = express();
const port = process.env.PORT || 4000;

const db = require('./models');
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
app.use('/api/polls', routes.poll);

app.use(handler.statusHandler);

app.use(handler.errorHandler);

app.listen(port, console.log(`Listening on port ${port}`));