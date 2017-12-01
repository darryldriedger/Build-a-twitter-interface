'use strict';

const express = require('express')
const router = express.Router();
const config = require('../config.js');
const Twit = require('twit');
const twitter = require('./twitter');
// const fuckit = twitter.fuckit;
const twitterData = twitter.twitterData;

// console.log(config);
const configs = config.config;

var T = new Twit({
  consumer_key:         configs.consumer_key,
  consumer_secret:      configs.consumer_secret,
  access_token:         configs.access_token,
  access_token_secret:  configs.access_token_secret,
  timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})

router.get('/', (req, res)=>{
twitterData(T, req, res);
});

router.get('/test', (req, res)=>{
res.render('tester')
});

router.get('/error', (req, res)=>{
res.render('error')
});
router.post('/post', (req, res)=>{
  let tweet = {
    'status': req.body.tweet_button
  };
  // - - - - - - - - - - post a tweet
  T.post('statuses/update', tweet , function(err, data, response) {
    console.log(tweet);
    console.log("tweeted")
  })
  // - - - - - - - - - - post a tweet
  setTimeout(function(){
    res.redirect('/');
  },1000);
});

module.exports = router;
