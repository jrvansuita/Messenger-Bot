var testObject = {"object":"page","entry":[{"id":"1015011101963764","time":1540323289042,"messaging":[{"sender":{"id":"1126009237498908"},"recipient":{"id":"1015011101963764"},"timestamp":1540323288588,"message":{"mid":"jX2yEbPA-R7Xmabyyj4sxiEAd5AwefS_06hYrRi-XAyMC0x1xuSK_AzfgaPP_g2pCA-xuit2AW1d9-vMCKcY4g","seq":48934,"text":"This message is a test!"}}]}]};

module.exports={
  run(){
    require('../handler/incoming.js').handle(testObject);
  }
};
