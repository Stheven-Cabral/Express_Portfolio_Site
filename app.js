/***
 * The following require methods load the 'express' framework and the 'data.json' file.
 * The express() function is called to create a express application for my portfolio site.
 */
const express = require('express');
const data = require('./data.json');
const app = express();


/***
 * Set the template engine to pug to view template files as HTML.
 */
app.set('view engine', 'pug');


/***
 * The following code serves static assets from the 'public' directory.
 */
app.use(express.static('public'));


/***
 * Defined a route to the homepage that renders the 'index' template.
 */
app.get('/', (req, res, next) => {
    res.render('index', {projects: data.projects});
});


/***
 * Defined a route to the about page that renders the 'about' template.
 */
app.get('/about', (req, res, next) => {
    res.render('about');
});


/***
 * Defined a route to specific project pages.
 * If a valid project page is requested, the 'project' template is rendered; else, a new error is defined.
 */
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error("I'm sorry. Page Not Found");
        console.log("We're sorry. Something went wrong.");
        err.status = 404;
        next(err);
    } 
});


/***
 * The following middleware is executed when no previous routes are executed.
 * The middleware functions creates a new error 'err' and passes it to the next() function.
 */
app.use((req, res, next) => {
    const err = new Error("I'm sorry. Page Not Found");
    console.log("We're sorry. Something went wrong.");
    err.status = 404;
    next(err);
});


/***
 * The following error middleware handles any errors passed to it and renders the 'error' template.
 * local 'error' variable is defined in order to set the response status to the err.status.
 */
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


app.listen(process.env.PORT || 3000);