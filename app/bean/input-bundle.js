module.exports = class InputBundle{

  constructor(userId, first_name, last_name, input){
    this.userId = parseInt(userId);
    this.first_name = first_name;
    this.last_name = last_name;
    this.input = input;
    this.date = new Date();
  }

  static fromProfile(user, input, recipientId){
    return new InputBundle(user.id, user.first_name ,user.last_name);
  }

  setInputMessage(messagingEvent){
    this.input = messagingEvent.message.text;
    return this;
  }

  setResponse(response){
    this.response = response;
    return this;
  }

  hasResponse(){
    return this.response != undefined;
  }
};
