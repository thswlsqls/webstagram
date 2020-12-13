const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        maxlength: 300
    },
    postImg: {
        type: String,
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    },
    isDeleted: {
        type: Boolean,
    },
    likeCount: {
        type: Number,
    },
    
  })


const Post = mongoose.model('Post', postSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { Post } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.

