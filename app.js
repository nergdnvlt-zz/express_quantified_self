const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

const foodsRouter = require('./api/v1/foods');
const mealsRouter = require('./api/v1/meals');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
