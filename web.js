var express = require("express");
var logfmt = require("logfmt");
var jquery = require("jquery");
var app = express();
var cal = require('./calformat.js');

app.use(express.bodyParser());
app.use(logfmt.requestLogger());

app.get('/calendar/new', function(req, res) {
	var calendar_form = 
	"<form method='post' action='/calendar/view'>"+
	"<textarea name='system[entry]' style='width:500px;height:250px;'>Enter your schedule here</textarea><br/>"+
	"<input type='submit' value='Submit'>"+
	"</form>";
	res.send(calendar_form);
});

app.post('/calendar/view', function(req, res) {
	console.log(req.body.system.entry);
	res.send(cal.basichtml());
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});