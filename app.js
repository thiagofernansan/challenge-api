var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./helpers/loadEnv').load()

var app = express();

const {readRecursiveDirectory} = require('./helpers/utils')
const {init} = require('./helpers/connectMongo')


app.use(logger('[:date[clf]] | ":method :url HTTP/:http-version" | STATUS: :status | CONTENT_LENGTH: :res[content-length] | RESPONSE_TIME: :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();

registryFavicon();

registryRoutes();
app.get('/', (req, res, next) => {
  res.json({title: 'Challenge API'})
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  console.error(err.stack)
  
  res.status(err.status || 500);
  res.json({ message: res.locals.message })
});

async function connectDB() {
  await init('models');
}

function registryFavicon() {
  let ignoreFavicon = (req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({
        nope: true
      });
    }
    else {
      next();
    }
  };
  app.use(ignoreFavicon);
}

function registryRoutes() {
  let fileRoutes = readRecursiveDirectory('routes').filter(item => {
    return item !== '';
  });
  fileRoutes.map(file => {
    let rf = require('./' + file.replace('.js', ''));
    let fn = file
      .replace('routes', '')
      .split('\\')
      .join('/')
      .replace('.js', '');
    app.use(fn, rf);
    console.log('Route ' + fn + ' --> ok!');
  });
}

module.exports = app;

