const Call = require('../returns/call.js');
const Blocks = require('../../airtable/blocks.js');

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
          if (this.typing_on){
            this.sendTypingOff();
          }

          callback();
        });
      }
    });
  }

  sendText(text, callback){
    this.sendTypingOff(calcDelay(text), ()=>{
      var data = this._getReturnBundle();

      data.message = {
        text : text
      };

      post(data, callback);
    });
  }

  sendTextParts(arr, index){
    if (arr[index]){
      this.sendText(arr[index], ()=>{
        index++;
        this.sendTextParts(arr, index);
      });
    }
  }

  send(inputBundle){
    var text = inputBundle.response;

    if (text){
      var blocks = new Blocks(text);

      if (blocks.is()){
        blocks.find((parts)=>{
          if (typeof parts == 'string'){
            this.sendText(parts);
          }else{
            this.sendTextParts(parts, 0);
          }

        });
      }else{
        this.sendText(text);
      }
    }
  }
};

function calcDelay(text){
  return text.length * 50;
}

function post(data, callback){
  new Call(data).post(callback);
}
