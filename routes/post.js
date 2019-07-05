const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const userPost = require('../controller/youtubePost');


router.get('/post', ensureAuthenticated, (req,res)=> {res.render('users/post')});

router.post('/post', ensureAuthenticated, userPost.userPost);

module.exports = router;