const express = require('express');
const router = express.Router();
const kyc = require('./kyc.js');
const admin = require('../controller/admin');

const  User = require('../models/user');
const ytbUpload = require('../models/youtubeUpload');

//Admin Dashboard
router.get('/',(req,res) => res.render('admin/dashboard'));


router.get('/kyc',(req,res) =>{
   User.find({isVerified: true}, (err,user)=>{
      if(err){
         console.log(err);
      }else {
          console.log(user);
          res.render('admin/kyc', {user: user})
      }
   });
}) ;

router.post('/kyc', (req, res) =>{
    console.log(req);
});

// User Info
router.get('/kyc/users', (req,res)=>{
    User.findOne({_id: req.query.id}, (err,user)=>{
        res.render('admin/users', {user: user});
    });
});

router.post('/kyc/users', admin.approre
);

router.get('/post', (req,res)=>{
    ytbUpload.find({isCheck: false},(err, embed)=>{
        if(err){
            console.log(err);
        }else {

            res.render('admin/post', {upload: embed});
        }
    });
});

router.post('/post', (req,res)=>{
    ytbUpload.updateOne({_id: req.body.id}, {$set: {isCheck: true}}, (err,upload)=>{
        if (err) throw err;
        req.flash('success_msg', 'Đã duyệt');
        res.redirect('/admin/post');
    })
});




module.exports = router;