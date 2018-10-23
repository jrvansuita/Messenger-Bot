var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '15mb',
  parameterLimit: 99999999
}));


var Incoming = require('./app/handler/incoming.js');

app.post("/", (req, res) => {
  res.sendStatus(200);

  new Incoming().handle(req.body);
});


process.on('uncaughtException', function (err) {
  console.log(err);
});



require('./app/test/tester.js').run();
