const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
        maxlength: 300
    },
    isDeleted: {
        type: Boolean,
    }
  })


const Comment = mongoose.model('Comment', commentSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { Comment } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.