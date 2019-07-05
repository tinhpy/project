const multer = require('multer');
const fs = require('fs');
const User = require('../models/user');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.user.loginName + '-' + Date.now() + '-' + file.originalname);
    }
});


var upload = multer({storage: storage}).array('img', 3);

module.exports = {
    img: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                req.flash('error', 'Tải lên tối đa 3 files');
                return res.redirect('/users/kyc');
            }
            if(req.files.length !== 3){
                const map = req.files.map(x=>{
                    fs.unlink('./public/images/uploads/'+ x.filename, (err)=>{
                       if(err) throw err;
                   })
                });
                req.flash('error', 'Vui lòng tải lên đủ 3 files');
                return res.redirect('/users/kyc');
            }
            else {
                var image = [];
                const map = req.files.map(x=>{
                    image.push(x.filename);
                });
                User.findOneAndUpdate({loginName: req.user.loginName}, {$set: {img: image, isReject: false}}, {new: true}, (err,doc)=>{
                    if(err) console.log(err);
                });
                req.flash('success_msg', 'Upload thành công. Vui lòng chờ admin duyệt');
                return res.redirect('/users/kyc');
            }
        });

    }
};