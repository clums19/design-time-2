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
activeUsersRouter.get('/new', (req, res) => {
    res.render('activeusers/new')
});
// Delete
activeUsersRouter.delete('/:id', (req, res) => {
    if (req.session.currentUser) {
    Blog.findByIdAndDelete(req.params.id, (error, deletedBlog) => {
        res.redirect('activeusers');
    });
    } else {res.render('users/new', {currentUser: req.session.currentUser})};
});
// Update
activeUsersRouter.put('/:id', (req, res) => {
    if (req.session.currentUser) {
    Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updateBlog) => {
        res.redirect(`/activeusers/${req.params.id}`);
    });
    } else {res.render('users/new', {currentUser: req.session.currentUser})};

});
// Create
activeUsersRouter.post('/', (req, res) => {
    Blog.create(req.body, (error, createdTattoo) => {
        res.redirect('activeusers');
    });
});

// Edit
activeUsersRouter.get('/:id/edit', (req, res) => {
    if (req.session.currentUser) {
    Blog.findById(req.params.id, (error, foundBlog) => {
        res.render('activeusers/edit', {
            blog: foundBlog,
        });
    });
    } else {res.render('users/new', {currentUser: req.session.currentUser})};

})
// Show
activeUsersRouter.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        Blog.findById(req.params.id, (err, foundBlog) => {
            res.render('activeusers/show', {
                blog: foundBlog,
            });
        });
    } else {res.render('users/new', {currentUser: req.session.currentUser})};
});

// Export
module.exports = activeUsersRouter;