module.exports = class InputBundle{

  constructor(userId, name, input){
    this.userId = parseInt(userId);
    this.name = name;
    this.input = input;
    this.date = new Date();
  }

  static fromProfile(user, input){
    return new InputBundle(user.id, user.first_name + ' ' +  user.last_name,  input);
  }

  setResponse(response){
    this.response = response;
  }

  hasResponse(){
    return this.response != undefined;
  }
};
