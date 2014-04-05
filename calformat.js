days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
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
	html+= "</tr></table>"
	return html;
}


function commitment(eventname,days,times){
	this.eventname = eventname;
	this.days = days;
	this.times = times;
}

function schedule(commitments){
	this.commitments = commitments;
	this.draw = function(){
		//var html = 
	};
}

module.exports.basichtml = basichtml;