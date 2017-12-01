'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');//????

const Twit = require('twit');
const app = express();

app.engine('pug', require('pug').__express);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/static', express.static('public'));
// Serve static file
// app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
// const twitterRoutes = require('./routes/twitter')

// app.use(twitterRoutes);
app.use(mainRoutes);

// error handling
app.use((res, req, next)=>{
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next)=>{
  res.locals.error = err;
  res.status(err.status);
  console.log(err.stack[0]);
  res.render('error');
});

// Assign port
app.set('port', process.env.PORT || 3000);

//server listener
app.listen(app.get('port'), ()=>{
  console.log(`the application is running on port: --> ${app.get('port')}!`);
});
