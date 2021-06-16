const express = require('express');
const activeUsersRouter = express.Router();
const Blog = require('../models/activeuser');

// Seed
const blogSeed = require('../models/blogSeed');

activeUsersRouter.get('/seed', (req, res) => {
    Blog.deleteMany({}, (error, allBlogs) => {});
    Blog.create(blogSeed, (error, data) => {
        res.redirect('/');
    });
});

// Index
activeUsersRouter.get('/', (req, res) => {
    if(req.session.currentUser) {
        Blog.find({}, (error, allBlogs) => {
        res.render('activeusers/index', {
        blogs: allBlogs,
        currentUser: req.session.currentUser
        });
    });
    } else {res.render('users/new', {currentUser: req.session.currentUser});
    };
});

// New

// Delete

// Update

// Create

// Edit

// Show


// Export
module.exports = activeUsersRouter;