var request = require('request');
const Config = require('../airtable/config.js');

var url = "https://graph.facebook.com/v2.6/[X]?fields=first_name,last_name,profile_pic&access_token=" + Config.get('fb_page_access_token');

module.exports={
  find(userId, callback){
    request.get(url.replace('[X]', userId), null, function(err, res, body){
      callback(JSON.parse(body));
    });
  }
};
