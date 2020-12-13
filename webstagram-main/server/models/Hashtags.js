const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    title: {
    },
  })


const Hashtag = mongoose.model('Hashtag', hashtagSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { Hashtag } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.