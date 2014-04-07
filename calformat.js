var $ = require("jquery");

days_abrev = ["U", "M", 'T', 'W', 'R', 'F', 'S'];
min_time = 6;
max_time = 22;

//extracts a json object from the user's entry
var extract = function(entry){
	entry = entry.replace(/\r/g,'');
	var lines = entry.split("\n");
	var commitments = [];
	for (var i in lines){
		var mystring = "one,two,three";
		var matches = lines[i].split(',');
		if (matches.length != 3){
			//they entered the wrong format
		}else{
			//jsonify their input
			var eventname = matches[0];
			var days_sym = ((matches[1]).replace(/ /,'')).split('');
			var days = days_sym.map(dayToNum);
			var times_12 = (matches[2]).split('-');
			var times = times_12.map(to24hour);
			var commitment = {
								eventname: eventname,
								days: days,
								times: times
							};
			commitments.push(commitment);
		}
	}
	return commitments;
}

//gives the day of the week (0-6) for the letter abreviation
function dayToNum(day){
	return days_abrev.indexOf(day);
}

//converts a time (eg. 3:00PM) into 24 hour time, then scales
//it to the screen (from the min time to the max time)
function to24hour(time){
	var hour, a = (/(\d+):(\d+)[ ]*([ap]m)/i).exec(time);
	if (a != null){
	hour = parseInt(a[1],10);
	if (hour<12 && (a[3]=="PM" || a[3]=="pm")){ hour +=	12; }
	return ((+hour + +(a[2]/60) - min_time)/(max_time-min_time));
	}
}

module.exports.extract = extract;