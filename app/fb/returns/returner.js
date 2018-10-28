const Call = require('../returns/call.js');

module.exports = class Returner{
  constructor(messagingEvent){
    this.senderID = messagingEvent.sender.id;
    this.typing_on = false;
  }

  _getReturnBundle(){
    return {
      recipient: {
        id: this.senderID
      }
    };
  }

  sendTypingOff(delay, callback) {
    var data = this._getReturnBundle();

    data.sender_action = this.typing_on ?  "typing_off" :  "typing_on";
    this.typing_on = !this.typing_on;

    post(data, ()=>{
      if (delay && callback){
        sleep(delay).then(()=>{
          callback();

          if (this.typing_on){
            this.sendTypingOff();
          }
        });
      }
    });
  }

  sendText(inputBundle){
    var delay = inputBundle.response.length * 30;

    if (inputBundle.response){
      this.sendTypingOff(delay, ()=>{
        var data = this._getReturnBundle();

        data.message = {
          text : inputBundle.response
        };

        post(data);
      });
    }
  }
};


function post(data, callback){
  new Call(data).post(callback);
}
