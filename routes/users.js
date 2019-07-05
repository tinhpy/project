const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const reg = require('../controller/register');
const log = require('../controller/login');

// Login Page
router.get('/login', (req, res) => res.render('users/login'));

// Register Page
router.get('/register', (req, res) => res.render('users/register'));

// Register
router.post('/register', reg.register);

// Verify
router.get('/confirmation', reg.verify);

// Resend Verify Page
router.get('/resendVerify',(reg,res)=> res.render('users/resendVerify'));
router.post('/resendVerify', reg.resendVerify);

// Login
router.post('/login', log.login);

router.get('/info', ensureAuthenticated, (req,res)=>res.render('users/info', {user: req.user}));

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});



module.exports = router;
