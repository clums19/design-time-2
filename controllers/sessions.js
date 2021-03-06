const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user');

// New (login page)
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new', {
        currentUser: req.session.currentUser
    });
});

// Delete (logout route)
sessionsRouter.delete('/', (req, res) =>{
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

// Create (sign up page)
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        if(!foundUser) {
            res.send(`Oops! No user with that email address has been registered.`);
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
        if (passwordMatches) {
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send(`Sorry, invalid password.`);
        }}
    });
});




// Export
module.exports = sessionsRouter;