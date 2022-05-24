const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

require('dotenv')
    .config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sign_upRouter = require('./routes/sign_up');
const sign_inRouter = require('./routes/sign_in');
const profileRouter = require('./routes/profile');
const exitRouter = require('./routes/exit');
const adsRouter = require('./routes/ads');
const cadsRouter = require('./routes/create_ad');
const gadsRouter = require('./routes/getAds')

const deleteRouter = require('./routes/delete')

const errRouter401 = require('./routes/error/401');

const app = express();

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {console.log(err ? err : ' connection true');}
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 16 * 1024 * 1024 },
}));


//Тут в основном только гет запросы, но среди них есть импостеры
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign_up', sign_upRouter);
app.use('/sign_in', sign_inRouter);
app.use('/profile', profileRouter);
app.use('/exit', exitRouter);
app.use('/ads', adsRouter);
app.use('/create_ad', cadsRouter);
app.use('/get_ads', gadsRouter);

//Удаление объявлений
app.use('/delete', deleteRouter);

//Страницы с ошибками
app.use('/unauthorized', errRouter401);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
