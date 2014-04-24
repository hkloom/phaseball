/*
=================================================

Phase Ball
Tai Rodrig
April 2014

MAIN NODE ENTRY

=================================================
*/

var express = require("express");
var logfmt = require("logfmt");
var path = require('path');
var $ = require("jquery");
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(logfmt.requestLogger());
 app.configure('development', function(){
  app.use(express.errorHandler());
 });


app.get('/challenge/:num', function(req, res) {
	var num = req.params.num;
	console.log("num "+num+"!!!");
	res.render('challenge.html', {
		title: "Challenge "+num,
		game: 	{ 
				ball: {x:5, y:6},
				board: {x:4, y:3, width:6, height:4},
				goal: {x:8, y:5, width:0.5,height:1.5}
				}
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});