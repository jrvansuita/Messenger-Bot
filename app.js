require('./app/init/init.js');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '15mb',
  parameterLimit: 99999999
}));

app.set('port', process.env.PORT || 3000);

app.get("/", (req, res) => {
  main(req, res);
});

app.post("/", (req, res) => {
  main(req, res);
});

app.listen(app.get('port'), function() {
  console.log('Node is running on port ', app.get('port'));
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

main = (req, res)=>{
  var goon = require('./app/fb/challenge.js').handle(req.url, res);

  if (goon){
    require('./app/handler/screening.js').handle(req.body);
    res.sendStatus(200);
  }
};
