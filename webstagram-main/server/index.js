// 기본 설정 ( 모듈 불러오기 + 기타 등등 )
const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // 로그
const path = require('path');// 패스
const dotenv = require('dotenv'); // 환경변수
const bodyParser = require('body-parser');

//const passport = require('passport');  // 패스포트


const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

//dotenv.config();  // env 파일을 환경변수로 설정 
//passportConfig();  // ?? 


const app = express()
app.set('port', process.env.PORT || 5000);


// 데이터베이스 설정
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thswlsqls:test1234mongodb@cluster0.ha0bc.mongodb.net/test2?retryWrites=true&w=majority',
{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))



//기타 미들웨어 설정
app.use(morgan('dev'));  // 로그 표현 방식중에 dev를 사용한다.
// app.use(express.static(path.join(__dirname, 'public')));  // ()안의 폴더 내용의 이름을 합친다. (__dirname == 폴더 위치) 
// app.use('/img', express.static(path.join(__dirname, 'uploads')));   // 기본적으로는 public 폴더를 사용하겠지만 /img 요청이 들어온다면 uploads 폴더를 사용할 것임
app.use(bodyParser.urlencoded({extended: true})); //application/X-www-form-urlencoded
app.use(bodyParser.json()); //application/json
app.use(cookieParser(process.env.COOKIE_SECRET));




// app.use(passport.initialize());  // 패스포트를 초기화 해주는 미들웨어
// app.use(passport.session());  //  ?? 

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);


// app.get('/', (req, res) => {
//   res.send('메인 페이지입니다.')
// })



app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);  // 에러메시지를 콘솔로 출력합니다. 
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});



