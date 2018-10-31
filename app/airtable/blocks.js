const Treat = require('../operations/treat.js');

module.exports = class Blocks{

  constructor(blockName){
    this.blockName = blockName;
  }

  is(){
    return this.blockName[0] == '[';
  }

  find(callback){
    var blockParts;

    Log.info('Block', this.blockName);

    AirBase('Blocks')
    .select({ pageSize: 50})
    .eachPage((records, fetchNextPage) => {

      var record = records.find((record) => {
        return record.get('Block') == this.blockName;
      });

      blockParts = Treat.blocks(record.get('Content'));

      if (blockParts){
         if (callback){
           callback(blockParts);
         }
      }else{
        fetchNextPage();
      }
    },(err) => {
      if (err) { Log.error(err); return; }

      if (!blockParts){
        Log.info('Block Missed', this.blockName);
      }
    });
  }

};
