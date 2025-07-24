const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const Comment = require('./models/Comment');

const app = express();
mongoose.connect('mongodb://localhost:27017/commentDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
}));

// 로그인 처리 (간단한 방식)
app.post('/login', (req, res) => {
  req.session.user = req.body.username;
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// 댓글 저장
app.post('/comment', async (req, res) => {
  if (!req.session.user) return res.status(403).send('로그인 필요');

  const comment = new Comment({
    username: req.session.user,
    content: req.body.comment
  });

  await comment.save();
  res.redirect('/');
});

// 홈 화면
app.get('/', async (req, res) => {
  const comments = await Comment.find({});
  res.render('index', {
    user: req.session.user,
    comments
  });
});

app.listen(3000, () => console.log('서버 실행 중 http://localhost:3000'));