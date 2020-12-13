const express = require('express')

const router = express.Router();

const { Comment } = require('../models/Comments');
    

    router.post('/create' , async  (req, res, next) => {

    const comment = new Comment(req.body);
    comment.save((err, userInfo) => { //mongoose의 메서드이다.
      if(err) return res.json({ success: false, err })
      return res.status(200).json({
          success: true
      })
    })
   });
   

   router.post('/get' , async  (req, res, next) => {
    const postID = await req.body.postID;
    const comments = await Comment.find({ postID : postID }).populate('userID');  // populate -> 내부의 키와 연관된 것을 합쳐서 반환한다.
    res.send(comments); 
   });
   

   
  module.exports = router ;