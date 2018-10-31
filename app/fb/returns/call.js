const request = require('request');

module.exports = class Call{
  constructor(data){
    this.data = data;
  }

  logging(){
    var data = this.data;
    var msg;

    if (data.sender_action){
      if (data.sender_action.includes('typing')){
        msg = data.sender_action;
      }
    }else if (data.message){
      if (data.message.text){
        msg = data.message.text;
      }
    }

    Log.info('Sent', msg);
  }

  post(callback){
    callSendAPI(this.data, (err, body)=>{
      if (err){
        Log.info('Failed', response.statusMessage + ' - ' + body.error);
      }else{
        this.logging();
        if (callback){
          callback();
        }
      }
    });
  }
};

function callSendAPI(data, callback) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: data

  }, function (error, response, body) {
    if (callback){
      callback(error, body);
    }
  });
}