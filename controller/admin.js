const  User = require('../models/user');
const ytbUpload = require('../models/youtubeUpload');
const fs = require('fs');

module.exports = {
    approre: (req,res)=>{
        if(req.body.button === 'approve'){
            User.findOneAndUpdate({_id: req.query.id}, {$set: {isApprove: true, isReject: false}}, (err)=>{
                if(err) throw err;
                req.flash('success_msg', 'Phê duyệt thành công');
                return res.redirect('/admin/'+req.url)

            })
        } else {
            User.findOneAndUpdate({_id: req.query.id}, {$set:{isReject: true}}, (err,user)=>{
                if(err) throw err;
                const map = user.img.map(x=>{
                    fs.unlink('./public/images/uploads/'+x, (error) =>{
                        if(error) throw error;
                    });
                });
                req.flash('error', 'Đã từ chối ảnh, xóa ảnh khỏi server');
                return res.redirect('/admin/'+req.url)
            })
        }
    }
};