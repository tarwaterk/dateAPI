var express = require("express");

var app = express();
var router = express.Router();

app.use(express.static(__dirname));
app.use('/test', express.static(__dirname + "/test.html"));

app.listen(3000);