'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Twit = require('twit');
const app = express();

app.engine('pug', require('pug').__express);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');
//====================================
// const mainRoutes = require('static/routes');
// //         // const cardRoutes = require('./routes/cards')
// //         // app.use('/cards',cardRoutes);
// app.use(mainRoutes);
        app.get('/', (req, res)=>{
          res.render('index');
        });
//=====================================

// app.use((res, req, next)=>{
//   console.log('running');
//   next();
// });
// app.use((res, req, next)=>{
//   const err = new Error('Not Found!');
//   err.status = 404;
//   next(err);
// });
// app.use((err, req, res, next)=>{
//   res.locals.error = err;
//   res.status(err.status);
//   res.render('error');
// });

app.listen(3000, ()=>{
  console.log("the application is running on localhost:3000!");
});

// /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
// $settings = array(
//     'oauth_access_token' => "YOUR_OAUTH_ACCESS_TOKEN",
//     'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
//     'consumer_key' => "YOUR_CONSUMER_KEY",
//     'consumer_secret' => "YOUR_CONSUMER_SECRET"
// );
