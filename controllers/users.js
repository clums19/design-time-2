// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// // Index
userRouter.get('/', (req, res) => {
    if(req.session.currentUser) {
        User.findOne(req.params.id, (error, oneUser) => {
        res.render('users', {
        user: oneUser,
        currentUser: req.session.currentUser
        });
    });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser});
    };
});

// New
userRouter.get('/new', async (req, res) => {
    res.render('users/new', {
        currentUser: req.session.currentUser
    })
    .then((error) => {
        res.redirect('sessions/new')
    });
});
// Delete

// Update
userRouter.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updateUser) => {
        res.redirect('/users/req.params.id');
    });
});

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
userRouter.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        User.findById(req.params.id, (err, foundUser) => {
            res.render('users/show', {
                user: foundUser,
                currentUser: req.session.currentUser
            });
        });
    } else {res.render('sessions/new', {currentUser: req.session.currentUser})};
});
// Export 
module.exports = userRouter;