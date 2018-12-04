const express = require("express");
var app = express();
var routes = require("./routes");
var bodyParser = require('body-parser');
var ENV = require("dotenv").config()


app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text({type: 'json'}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use("/", routes);

app.server = app.listen(8080, function(){
  console.log('Weedinize on '+ app.server.address().port)
});