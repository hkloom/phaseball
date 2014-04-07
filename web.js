/*
=================================================

Schedule Prettyfier
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
var cal = require('./calformat.js');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(logfmt.requestLogger());
 app.configure('development', function(){
  app.use(express.errorHandler());
 });


app.get('/calendar/new', function(req, res) {
	res.render('calendar_form.html');
});

app.post('/calendar/view', function(req, res) {
	var commitments = cal.extract(req.body.system.entry);
	res.render('schedule1.html', { title: 'YOUR SCHEDULE!', commitments: commitments});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});