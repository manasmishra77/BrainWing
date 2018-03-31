var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const mongoose = require('mongoose');
var mongoDbAtlasUri = "mongodb://brainWingUser:rhJdZZYK4MpmoHjJ@brainwing-shard-00-00-haclw.mongodb.net:27017,brainwing-shard-00-01-haclw.mongodb.net:27017,brainwing-shard-00-02-haclw.mongodb.net:27017/test?ssl=true&replicaSet=brainWing-shard-0&authSource=admin";
mongoose.connect(mongoDbAtlasUri, {
  useMongoClient: true
}, function(err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  //example();
  console.log('found');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/create', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
