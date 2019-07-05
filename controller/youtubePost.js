// Model
const ytbUpload = require('../models/youtubeUpload');
function embedCode(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

module.exports = {
  userPost: (req, res)=>{

      var code =  embedCode(req.body.link);
      const upload = new ytbUpload({
          embed: code,
          category: req.body.category,
          subject: req.body.subject,
          description: req.body.description,
          user: req.user.loginName
      });
      upload.save();
      req.flash('success_msg', 'Đã gửi. Vui lòng chờ admin duyệt');
      res.redirect('/users/post');
  }
};