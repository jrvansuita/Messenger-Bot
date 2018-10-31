const Treat = require('../operations/treat.js');

module.exports = class Blocks{

  constructor(blockName){
    this.blockName = blockName;
  }

  is(){
    return this.blockName[0] == '[';
  }

  find(callback){
    var blocks;

    Log.info('Block', this.blockName);

    AirBase('Blocks')
    .select({ pageSize: 50})
    .eachPage((records, fetchNextPage) => {

      var record = records.find((record) => {
        return record.get('Block').toLowerCase() == this.blockName.toLowerCase();
      });

      var blocks = {
        parts : Treat.blocks(record.get('Content')),
        buttons: Treat.blocks(record.get('Buttons'))
      };

      if (blocks){
         if (callback){
           callback(blocks);
         }
      }else{
        fetchNextPage();
      }
    },(err) => {
      if (err) { Log.error(err); return; }

      if (!blocks){
        Log.info('Block Missed', this.blockName);
      }
    });
  }

};
