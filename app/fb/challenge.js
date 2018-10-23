let URL = require('url');

module.exports={
  handle(url, res){
    var query = URL.parse(url, true).query;

    if (query['hub.mode'] == 'subscribe'){
      if (query['hub.verify_token'] === 'bot_token') {
        console.log('Valid token ' + query['hub.challenge']);
        res.end(query['hub.challenge']);
      } else {
        res.end('Invalid verify token');
      }

      return false;
    }

    return true;
  }
};
