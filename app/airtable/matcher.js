const Compare = require('../operations/compare.js');
const Treat = require('../operations/treat.js');

module.exports = class Matcher{

  constructor(message){
    this.input = Treat.clean(message);
  }

  error(onErrorListener){
    this.onErrorListener = onErrorListener;
    return this;
  }

  miss(onMissListener){
    this.onMissListener = onMissListener;
    return this;
  }

  found(callback){
    var match = false;

    AirBase('Responses')
    .select({ pageSize: 50, view: "Criteria Order"})
    .eachPage((records, fetchNextPage) => {

      var response;

      match = records.some((record) => {
        response = record.get('Response');
        return response && _compare(this.input, record.get('Expression'), record.get('Keywords'));
      });

     if (match){
       response = Treat.choose(response);
       Log.info('Match', response);
       callback(response);
     }else{
       fetchNextPage();
     }
   },  (err) => {
       if (err && this.onErrorListener) { this.onErrorListener(err); return; }

       if (!match && this.onMissListener){
         Log.info('Missed', this.input);
         this.onMissListener();
       }
    });
  }

};

let _compare = (input, expression, keywords) => {
   return expression && keywords && Compare[expression](input, keywords);
};
