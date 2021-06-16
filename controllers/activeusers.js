const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


// Index
usersRouter.get('/', (req, res) => {
    if(req.session.currentUser) {
        res.render('activeusers/index', {currentUser: req.session.currentUser});
    } else {res.render('users/new', {currentUser: req.session.currentUser});};
});

// New

// Delete

// Update

// Create

// Edit

// Show


// Export
module.exports = usersRouter;