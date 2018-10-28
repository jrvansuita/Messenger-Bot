global.Log ={

  info(tag, msg){
    console.log('[' + tag + '] : ' +  msg);
  },

  error(e){
    var message = e.toString();
    message += "\n" + e.stack.split("\n")[1];
  
    this.info('Error', message);
  }
};
