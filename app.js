var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '15mb',
  parameterLimit: 99999999
}));


app.post("/", (req, res) => {
  res.sendStatus(200);

  handleIncoming(req.body, res);
});


process.on('uncaughtException', function (err) {
  console.log(err);
});
