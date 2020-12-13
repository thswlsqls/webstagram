const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    followerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  })


const Follow = mongoose.model('Follow', followSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { Follow } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.