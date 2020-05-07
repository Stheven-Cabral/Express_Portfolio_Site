const express = require('express');
const data = require('./data.json');

const app = express()

app.set('view engine', 'pug');

/*Serve static files*/
app.use(express.static('public'));

/*Route to the home page*/
app.get('/', (req, res, next) => {
    res.render('index', {projects: data.projects});
});

/*Route to the about page*/
app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    res.send('<h1>work in progress</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});