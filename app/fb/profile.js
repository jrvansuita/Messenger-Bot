var request = require('request');

var url = "https://graph.facebook.com/v2.6/[X]?fields=first_name,last_name,profile_pic&access_token=" + process.env.PAGE_ACCESS_TOKEN;

module.exports={
  find(userId, callback){
    request.get(url.replace('[X]', userId), null, function(err, res, body){
      callback(JSON.parse(body));
    });
  }
};
