const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const image = require('../controller/knowYourCustomer')





router.get('/kyc',ensureAuthenticated, (req, res) => {
    res.render('users/upload')});

router.post('/kyc',ensureAuthenticated,  image.img);


module.exports = router;