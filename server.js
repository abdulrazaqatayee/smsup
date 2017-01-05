require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var httpLogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var winston  = require('winston');
const groupAdmin = require('./server/subscription/groupRepo');
var transport = require('./server/transport/transport');
import { GROUPS_PATH } from './client/src/admin/storage';

if(process.env.LOG_LEVEL) {
  winston.level = process.env.LOG_LEVEL;
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httpLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get(GROUPS_PATH, (req, res) => {
  groupAdmin.list()
    .then((group) => res.json(group));
});

app.put(GROUPS_PATH, (req, res) => {
  groupAdmin.save(req.body)
    .then((group) => res.json(group))
    .catch(() => res.json({ status: 'bad' }));
});

app.use('/api', transport.receiveRoute());

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

  console.error(err);
  // render the error page
  res.status(err.status || 500);

  res.json({status: 'error'});
});

module.exports = app;
