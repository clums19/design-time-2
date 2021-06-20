const express = require('express');
const activeUsersRouter = express.Router();
const Blog = require('../models/activeuser');
const User = require('../models/user');


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
        Blog.find({}, (error, foundBlog) => {
        res.render('activeusers', {
        blog: foundBlog,
        currentUser: req.session.currentUser
        });
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser});
    };
});
// New
activeUsersRouter.get('/new', (req, res) => {
    if (req.session.currentUser) {
    res.render('activeusers/new', {
        currentUser: req.session.currentUser
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
});

// Delete
activeUsersRouter.delete('/:id', (req, res) => {
    if (req.session.currentUser) {
    Blog.findByIdAndDelete(req.params.id, (error, deletedBlog) => {
        res.redirect('/users');
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
});
// Update
activeUsersRouter.put('/:id', (req, res) => {
    if (req.session.currentUser) {
    Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updateBlog) => {
        res.redirect(`/activeusers/${req.params.id}`);
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};

});
// Create
activeUsersRouter.post('/', (req, res) => {
    if (req.session.currentUser) {
    Blog.create(req.body, (error, createdTattoo) => {
        res.redirect('/users');
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
});

// Edit
activeUsersRouter.get('/:id/edit', (req, res) => {
    if (req.session.currentUser) {
    Blog.findById(req.params.id, (error, foundBlog) => {
        res.render('activeusers/edit', {
            blog: foundBlog,
            currentUser: req.session.currentUser
        });
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};

})
// Show
activeUsersRouter.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        Blog.findById(req.params.id, (err, foundBlog) => {
            res.render('activeusers/show', {
                blog: foundBlog,
            currentUser: req.session.currentUser
            });
        });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
});

// Export
module.exports = activeUsersRouter;