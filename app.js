const express = require('express');
const { projects } = require('./data.json');

const app = express()

app.set('view engine', 'pug');

/*Route to the home page*/
app.get('/', (req, res, next) => {
    res.send('<h1>Hello</h1>');
});

app.get('/about', (req, res, next) => {});

app.get('/project', (req, res, next) => {});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});