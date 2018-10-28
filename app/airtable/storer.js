module.exports= class Storer{

  constructor(inputBundle){
    this.inputBundle = inputBundle;
  }

  static handle(inputBundle, callback){
    new Storer(inputBundle).apply(callback);
  }

  apply(callback){
    if(this.inputBundle.hasResponse()){
      this.recognized(callback);
    }else{
      this.notRecognized(callback);
    }
  }

  recognized(callback){
    store(this.inputBundle, 'Recognized', callback);
  }

  notRecognized(callback){
    store(this.inputBundle, 'Not Recognized', callback);
  }

};



function store(inputBundle, table, callback) {
  AirBase(table).create(inputBundle, (err, record) =>{

    if(err){
      Log.error(err);
    }else{
      Log.info('Stored', 'AirTable ' + table);
    }

    callback(err);
  });
}
