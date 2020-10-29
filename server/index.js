const express = require('express');
const app = express();
const port = 4000;

const handler = require('./handlers');

app.listen(port, console.log(`Listening on port ${port}`));
// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.get('/', (req, res) => {
    res.json({greet: 'hello'});
})

app.use(handler.statusHandler);

app.use(handler.errorHandler);