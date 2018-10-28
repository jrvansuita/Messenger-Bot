const Matcher = require('../airtable/matcher.js');
const Storer = require('../airtable/storer.js');

module.exports = class Logic{

  constructor(inputBundle){
    this.inputBundle = inputBundle;
  }

  result(onResult){
    if (onResult){
      this.onResult = onResult;
    }else{
      Storer.handle(this.inputBundle, (err)=>{
        if (this.onResult){
          this.onResult(this.inputBundle);
        }
      });
    }

    return this;
  }

  run(){
    new Matcher(this.inputBundle.input)
    .error((err)=>{
      Log.error(err);
    })
    .miss(()=>{
      this.result();
    })
    .found((response)=>{
      this.inputBundle.setResponse(response);
      this.result();
    });

  }

};
