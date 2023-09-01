//Create web server
const express = require('express')
const app = express()
const port = 3000

//Create database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/expressjs', { useNewUrlParser: true, useUnifiedTopology: true });

//Create model
const Comment = mongoose.model('Comment', {
    name: String,
    content: String
});

//import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//import express-handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//import path
const path = require('path');

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('home');
})

app.get('/comments', (req, res) => {
    Comment.find().then(comments => {
        res.render('comments', { comments: comments });
    })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments/new', (req, res) => {
    const newComment = new Comment(req.body);
    newComment.save().then(() => {
        res.redirect('/comments');
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})