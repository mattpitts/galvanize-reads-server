const express = require('express');


const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./api/router');
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors({
	credentials: true,
	origin: process.env.CORS_ORIGIN
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);



// error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
	  message: err.message,
	  error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
