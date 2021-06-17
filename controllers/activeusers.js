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

// Update
// tattooRouter.put('/:id', (req, res) => {
//     Tattoo.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     }, (error, updateTattoo) => {
//         res.redirect(`/tattoos/${req.params.id}`);
//     });
// });
// Create
activeUsersRouter.post('/', (req, res) => {
    Blog.create(req.body, (error, createdTattoo) => {
        res.redirect('activeusers');
    });
});

// Edit

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