const Call = require('../returns/call.js');
const Blocks = require('../../airtable/blocks.js');

module.exports = class Returner{
  constructor(messagingEvent){
    this.senderID = messagingEvent.sender.id;
    if (messagingEvent.postback){
      this.postbackName = messagingEvent.postback.payload;
    }
    this.typing_on = false;
  }

  _getReturn(){
    return {
      recipient: {
        id: this.senderID
      }
    };
  }

  _getReturnButton(text, buttons){
    return {
      recipient: {
        id: this.senderID
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            text : text,
            buttons: getButtons(buttons),
            template_type: "button"
          }
        }
      }
    };
  }

  sendTypingOff(delay, callback) {
    var data = this._getReturn();

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

  sendText(text, buttons, callback){
    this.sendTypingOff(calcDelay(text), ()=>{
      var data;

      if (buttons){
        data = this._getReturnButton(text, buttons);
      }else{
        data = this._getReturn();
        data.message = {
          text : text
        };
      }

      post(data, callback);
    });
  }

  sendTextParts(blocks, index){
    if (Array.isArray(blocks.parts)){
      if (blocks.parts[index]){
        this.sendText(blocks.parts[index], (index == (blocks.parts.length-1)) ? blocks.buttons : null, ()=>{
          index++;
          this.sendTextParts(blocks, index);
        });
      }
    }else{
      this.sendText(blocks.parts);
    }
  }

  send(inputBundle){
    var text = inputBundle.response;

    if (text){
      var blocks = new Blocks(text);

      if (blocks.is()){
        blocks.find((blocks)=>{
          this.sendTextParts(blocks, 0);
        });
      }else{
        this.sendText(text);
      }
    }
  }

  postback(){
    var blocks = new Blocks(this.postbackName);

    if (blocks.is()){
      blocks.find((blocks)=>{
        this.sendTextParts(blocks, 0);
      });
    }
  }
};

function calcDelay(text){
  return text.length * 20;
}

function post(data, callback){
  new Call(data).post(callback);
}

function getButtons(buttonsArr){
  var buttons = [];
  buttonsArr.forEach(function(item){
    buttons.push(buildButton(item));
  });

  return buttons;
}

function buildButton(str){
  var button = {};

  if (str.includes('@')){
    button.title = str.split('@')[0].trim();
    var ref = str.split('@')[1].trim();
    var isUrl = ref.indexOf("http") != -1;
    button.type = isUrl ? "web_url" : "postback";

    if (isUrl){
      button.url = ref;
    }else{
      button.payload = '[' + ref.trim() + ']';
    }
  }

  return button;

}
