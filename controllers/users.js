// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// Index
// userRouter.get('/', (req, res) => {
//     if(!req.session.currentUser) return 
//     res.redirect('/');
//     res.render('/users/index', {
//         currentUser: req.session.currentUser})
// });
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

// Show

// Export 
module.exports = userRouter;