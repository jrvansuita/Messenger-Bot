
module.exports = {

  get(tag){
    var val = global.config[tag].toString();

    return val == 'false' ? false : val;
  },

  load(callback){
    global.config = {};

    Log.info('Config Load', 'Buscando configurações');

    AirBase('Config')
    .select({ pageSize: 99})
    .eachPage((records, nextPage) => {

      records.forEach((record) => {
        global.config[record.get('tag')] = record.get('value');
      });

      Log.info('Loaded', JSON.stringify(global.config));
 
      if (callback){
        callback(global.config);
      }

     nextPage();
    },(err) => {
      if (err) { Log.error(err); return; }
    });
  }

};
