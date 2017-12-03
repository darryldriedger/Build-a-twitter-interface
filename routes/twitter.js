/*jshint esversion: 6 */
/*globals $:false */
'use strict';

const twitterData = (T, req, res) => {

let statusProm = new Promise(function(resolve, reject) {
  let statusArray = [];
  //code for retrieving the last 5 tweets the user has made --last 5 tweets
  T.get('statuses/user_timeline', { q: "darryldriedger" , count: 5 },  function (err, data, response) {
    if(!err){
      for(let i=0; i < 5; i++){
          let obj = {};
          obj.name = data[i].user.name;
          obj.screenName = '@' + data[i].user.screen_name;
          obj.image = data[i].user.profile_image_url;
          obj.banner = data[i].user.profile_banner_url;
          obj.time = data[i].created_at;
          obj.text = data[i].text;
          obj.re = data[i].retweet_count;
          obj.fav = data[i].favorite_count;
          statusArray.push(obj);
      } //end of for
      console.log(statusArray[0]);
			resolve(statusArray);
			} else {
			reject(err);
			}
  });
  //code for retrieving the last 5 tweets the user has made --last 5 tweets
});

let followingProm = new Promise(function(resolve, reject) {
  //code for retreiving the last 5 accounts i have followed -- last 5 followed
  T.get('friends/list', { q: "darryldriedger" , count: 200 },  function (err, data, response) {
    let following = [];
    let followingNumber;
    let followLength = 0;
    // console.log(data.users);
    if(!err){
      if(data.users.length < 5){
        followLength = data.users.length;
      } else {
        followLength = 5;
      }
        for(let i=0; i < followLength; i++){
          let obj = {};
          obj.name = data.users[i].name;
  				obj.screenName = '@' + data.users[i].screen_name;
  				obj.image = data.users[i].profile_image_url;
  				obj.following = data.users[i].following;
          following.push(obj);
        }
        followingNumber = data.users.length;
  		resolve(following, followingNumber);
		} else {
		    reject(err);
		}
  });
  //code for retreiving the last 5 accounts i have followed -- last 5 followed
});
// code for retrieving the number of accounts followed
let followingNumProm = new Promise(function(resolve, reject) {
  T.get('friends/list', { q: "darryldriedger" , count: 200 },  function (err, data, response) {
    let followingNumber;
    if(!err){
      followingNumber = data.users.length;
		resolve(followingNumber);
		} else {
		reject(err);
		}
  });
});
// code for retrieving the number of accounts followed

let messageRecProm = new Promise(function(resolve, reject) {
  //code for retrieving the last 5 direct messages -- Last 5 direct messages
  T.get('direct_messages', { q: "darryldriedger" , count: 5 },  function (err, data, response) {
    let messageLength;
    if(!err){
      if(data.length < 5){
        messageLength = data.users.length;
      } else {
        messageLength = 5;
      }
      let messagesReceived = [];
            for(let i=0; i < messageLength; i++){
            let obj = {};
            obj.who = "app--message";
            obj.name = '@' + data[i].sender_screen_name;
            obj.text = data[i].text;
            obj.image = data[i].sender.profile_image_url;
            obj.time = data[i].created_at;
            messagesReceived.push(obj);
            }
      		resolve(messagesReceived);
    		} else {
    		reject(err);
    		}
  });
  //code for retrieving the last 5 direct messages -- Last 5 direct messages
});

let messageSenProm = new Promise(function(resolve, reject) {
  //code for retrieving the last 5 direct messages sent -- last 5 direct messages sent
  T.get('direct_messages/sent', { q: "darryldriedger" , count: 5 },  function (err, data, response) {
    if(!err){
    let messagesSent = [];
          for(let i=0; i < data.length; i++){
          let obj = {};
          obj.who = "app--message--me";
          obj.name = '@' + data[i].sender_screen_name;
          obj.text = data[i].text;
          obj.image = data[i].sender.profile_image_url;
          obj.time = data[i].created_at;
          messagesSent.push(obj);
          }
    		resolve(messagesSent);
    		} else {
    		reject(err);
    		}
  });
  //code for retrieving the last 5 direct messages sent -- last 5 direct messages sent
});

  //the code for simplifying the retrieval of messages
  const messenger = (arr1, arr2)=>{
    let messengerArr = [];

    for(let i=0; i < arr1.length && arr2.length ; i++){
      if(arr1[i].time < arr2[i].time){
        messengerArr.push(arr2[i]);
        messengerArr.push(arr1[i]);
      } else {
        messengerArr.push(arr1[i]);
        messengerArr.push(arr2[i]);
      }
    }
    // console.log(messengerArr);
    return messengerArr;
  };
  //the code for simplifying the retrieval of messages

  // Once all promises are resolved render page
  Promise.all([statusProm, followingProm, messageRecProm, messageSenProm,followingNumProm]).then(function(data) {
    let messengerArr = messenger(data[3], data[2]);
    // console.log(data[0][1].banner);
		// console.log("page updated");
    res.render('index', {
      status: data[0],
      following: data[1],
      fnumber: data[4],
      messenger: messengerArr
    });
  })
  .catch(function(err) {
  console.log("error");
    res.render('error', {error : 'Something went wrong with the API ... Twitter data in limbo .. :( '})
  });
};

module.exports.twitterData = twitterData;
