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
				balls: [
					{x:4, y:7},
					{x:5, y:6},
					{x:3, y:4},
					{x:4.5, y:5},
					],
				board: {x:2, y:1, width:16, height:14},
				goal: {x:8, y:5, width:0.5,height:1.5},
				obstacles: 	[
							{x:7, y:4, width:0.2,height:2},
							{x:5.5, y:6, width:0.8,height:0.3}
							]
				}
	});
});

app.get('/create', function(req, res) {
	res.render('levelcreator.html', {
		title: "Create new level",
		game: 	{ 
				balls: [
					{x:4, y:7},
					{x:5, y:6},
					{x:3, y:4},
					{x:4.5, y:5},
					],
				board: {x:2, y:1, width:16, height:14},
				goal: {x:8, y:5, width:0.5,height:1.5},
				obstacles: 	[
							{x:7, y:4, width:0.2,height:2},
							{x:5.5, y:6, width:0.8,height:0.3}
							]
				}
	});
});

app.get('/info', function(req, res) {
	res.render('info.html', {});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});