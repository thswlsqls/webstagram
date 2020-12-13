const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템, multer 까지 씀

const router = express.Router();

const { Post } = require('../models/Posts');
const { PostLike } = require('../models/PostLikes');

try {
  fs.readdirSync('client/public/uploads');  // 디렉토리 즉 폴더를 읽어온다는데 , 읽어와서 어떻게 한다는 건지는 모르겠음
} catch (error) { // 디렉토리를 못 찾았을 경우
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('client/public/uploads');  // 아마 디렉토리를 새로 만드는 데인듯
}


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {  
      cb(null, 'client/public/uploads'); 
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);   // 파일의 원래 이름을 받아온다. 
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);  // 파일을 내려받을 때 아마, 파일 이미지명을 저렇게 설정 한다는 뜻인 듯( 시간 + 처음 파일 내용 ??? ) 
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 올릴 수 있는 파일 사이즈? 
});

  router.post('/img', upload.single('img'), async (req, res, next) => {  // '/img' 요청이 온다면, 로그인 중인지를 미들웨어를 통해 확인하고, img 를 업로드 한다. 
    await res.json({ url: "/uploads/" + req.file.filename});  
  });

  const __upload = multer()

  router.post('/create', __upload.none() ,async (req, res, next) => {
      
    //정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다.
  
    const post = new Post({ userID : req.body.userID , content : req.body.content , postImg : req.body.postImg});
  
     post.save((err, userInfo) => { //mongoose의 메서드이다.
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
      })
  })


  router.get('/get' , async  (req, res, next) => {
    const post = await Post.find().populate('userID').sort({'_id': -1});  // populate -> 내부의 키와 연관된 것을 합쳐서 반환한다.
    res.send(post);
   });
   

   router.post('/like' , async  (req, res, next) => {
     await PostLike.update({ postID : req.body.postID }, { $push: { userID : req.body.userID } }, {upsert: true});
     const likeUsers = await PostLike.find({ postID : req.body.postID },{userID : 1});
     await res.send(likeUsers);
   });


  module.exports = router ;