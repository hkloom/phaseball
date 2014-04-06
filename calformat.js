var $ = require("jquery");

days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
days_abrev = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
min_time = 6;
max_time = 22;

var basichtml = function(){
	var html = "<table class='schedule-table'>"+
	"<tr><th colspan = '7'> YOUR SCHEDULE </th></tr>"+
	"<tr class='schedule-header'>";
	for (var i=0; i<7; i++){
		html += "<td class='calendar-header'>"+
		days[i]+"</td>";
	}
	html+= "</tr>"
	return html;
}

var Commitment = function(eventname,days,times){
	this.eventname = eventname;
	this.days = days;
	this.times = times;
}

var extract = function(entry){
	entry = entry.replace(/\r/g,'');
	var lines = entry.split("\n");
	//console.log(lines);
	var commitments = [];
	for (var i in lines){
		var mystring = "one,two,three";
		var matches = lines[i].split(',');
		if (matches.length != 3){
			//console.log("Wrong format! Expected 3, got "+matches.length+" entries\n");
		}else{
			var eventname = matches[0];
			var days = matches[1];
			var times = matches[2];
			var commitment = new Commitment(eventname,days,times);
			//console.log(commitment);
			commitments.push(commitment);
		}
	}
	return commitments;
}

function to24hour(time){
	var hour, a = (/(\d+):(\d+)([ap]m)/i).exec(time);
	hour = parseInt(a[1],10);
	if (hour<12 && a[3]=="pm"){ hour +=	12; }
	return hour+(groups[2]/60);
}


var show = function(commitments){
	var html = "";
	for (var i in commitments){
		var c = commitments[i];
		var name = c.eventname;
		var days = ((c.days).replace(/ /,'')).split('');
		var times_unfrmt = (c.times).split('-');
		var times = times_unfrmt.map(to24hour);
		console.log(times);
	
	for (var j=min_time; j<=max_time; j++){ //number of rows
		html+="<tr>";
		for (var k=0;k<7;k++){ //number of columns
			html+="	<td>";
			//if the event exists at this time on this day, list it
			var index = days.indexOf(days_abrev[k]);
			if (index != -1){
				//console.log(name+" occurs on "+index);
				html+="1";
			}else{
				html+="0";
			}
			html+= "</td>";
		}
		html+="</tr>";
	}
	html+="</table>";
	}
	return html;
}

function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

function schedule(commitments){
	this.commitments = commitments;
	this.draw = function(){
		//var html = 
	};
}

module.exports.basichtml = basichtml;
module.exports.extract = extract;
module.exports.show = show;