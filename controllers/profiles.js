const express = require('express');
const profilesRouter = express.Router();
const Blogs = require('../models/activeuser');
const User = require('../models/user');


// Seed
// const blogSeed = require('../models/blogSeed');

// profilesRouter.get('/seed', (req, res) => {
//     Blogs.deleteMany({}, (error, allBlogs) => {});
//     Blogs.create(blogSeed, (error, data) => {
//         res.redirect('/');
//     });
// });

// Index
profilesRouter.get('/', (req, res) => {
    if(req.session.currentUser) {
        Blogs.find({createdBy: req.session.currentUser}, (error, allProfiles) => {
        res.render('profiles', {
        profiles: allProfiles,
        currentUser: req.session.currentUser
        });
    });
    } else {res.render('users/new', {currentUser: req.session.currentUser});
    };
});
// New
profilesRouter.get('/new', (req, res) => {
    if(req.session.currentUser) {
        res.render('profiles/new')
    } else {res.render('users/new', {currentUser: req.session.currentUser});};
});


// Create
profilesRouter.post('/', (req, res) => {
    if(req.session.currentUser) {
    Blogs.create(req.body, (error, createdBlogs) => {
        res.redirect('profiles');
    });
} else {res.render('users/new', {currentUser: req.session.currentUser});};

});
// Exports
module.exports = profilesRouter;
