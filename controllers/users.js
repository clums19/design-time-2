// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// // Index
userRouter.get('/', (req, res) => {
    if(req.session.currentUser) {
        User.find({}, (error, allUsers) => {
        res.render('users', {
        users: allUsers,
        currentUser: req.session.currentUser
        });
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser});
    };
});

// New
userRouter.get('/new', (req, res) => {
    res.render('users/new', {
        currentUser: req.session.currentUser
    });
});
// Delete

// Update

// Create
userRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    });
});
// Edit 
userRouter.get('/:id/edit', (req, res) => {
    if (req.session.currentUser) {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('users/edit', {
            user: foundUser,
            currentUser: req.session.currentUser
        });
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
})
// Show

// Export 
module.exports = userRouter;