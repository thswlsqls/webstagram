const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 시스템, multer 까지 씀

const router = express.Router();

const { User } = require('../models/Users');
const { Follow } = require('../models/Follows');


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


router.post('/profileUpdate', upload.single('profileImg'), async (req, res) => {

  await User.updateMany({ _id: req.body.userID }, { $set: { location: req.body.location, birthday: req.body.birthday, job: req.body.job, profileImg: req.body.url } }, { upsert: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


router.post('/profile', async (req, res) => {

  const profile = await User.find({ _id: req.body.userID }, {password : 0})
  await res.json(profile);
});


router.post('/following', async (req, res) => {

  const following = await User.find({ _id: req.body.followingID }, { _id : 0})
  if(following){

    const follow = new Follow({ followerID: req.body.followerID , followingID : req.body.followingID });

    follow.save((err, userInfo) => { 
      if(err) return res.json({ success: false, err })
      return res.status(200).json({
          success: true
      })
    })

  }else {
  res.status(404).send('no user'); 
  }
  
});

router.post('/getFollowing', async (req, res) => {

  const followingUser = await Follow.find({ followerID : req.body.userID } , { _id : 0 ,  followingID : 1}).populate('followingID');
  if(followingUser){
  res.json(followingUser);  

  }else {
  res.status(404).send('no user'); 
  }

});


module.exports = router;