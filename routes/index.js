const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// Welcome Page
router.get('/', (req, res) => res.render('welcome'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('users/dashboard', {
            user: req.user
        });
});

module.exports = router;
