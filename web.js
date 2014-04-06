var express = require("express");
var logfmt = require("logfmt");
var jade = require("jade");
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var $ = require("jquery");
var app = express();
var cal = require('./calformat.js');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
 }

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
  src: __dirname + "/public",
  compress: true
}));
app.use(express.static(__dirname + '/public/static'));
app.use(app.router);
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(logfmt.requestLogger());
 app.configure('development', function(){
  app.use(express.errorHandler());
 });


app.get('/calendar/new', function(req, res) {
	var calendar_form = 
	"<form method='post' action='/calendar/view'>"+
	"<textarea name='system[entry]' style='width:500px;height:250px;'>Enter your schedule here</textarea><br/>"+
	"<input type='submit' value='Submit'>"+
	"</form>";
	res.send(calendar_form);
});

app.post('/calendar/view', function(req, res) {
	//console.log(req.body.system.entry);
	var cs = cal.extract(req.body.system.entry);
	res.render("schedule",{title: 'WACKY INFLATABLE WIGGLY TUBE MAN'});
	//cal.draw_block()
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});