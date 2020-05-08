const express = require('express');
const data = require('./data.json');

const app = express();

/*Pug setup*/
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

/*Route to the about page*/
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    } 
});

/*Catches any 404 errors*/
app.use((req, res, next) => {
    const err = new Error('Not Found');
    console.log("We're sorry. Something went wrong.");
    err.status = 404;
    next(err);
});

/*Error handling*/
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000);