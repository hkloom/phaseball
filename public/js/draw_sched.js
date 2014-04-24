/*
=================================================

Schedule Prettifier
Tai Rodrig
April 2014

DRAWING FUNCTIONS FOR DISPLAYING THE SCHEDULE

=================================================
*/


//---GLOBAL VARS---
days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
min_time = 6;


//--HELPER FUNCTIONS---
function rand(min, max) { return parseInt(Math.random() * (max-min+1), 10) + min;}

//gets a random color from a restricted range
function get_random_color() {
	var h = rand(0, 250);
    var s = rand(80, 100); //get saturated colors
    var l = rand(20, 30); //get dark colors
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

//converts num to string, eg. 7 to 1PM
function time_to_string(time){
	var ntime = time+min_time;
	var ext = "AM";
	if (ntime >= 12){
		ext = "PM";
		if (ntime > 12) ntime = ntime-12;
	}
	return ntime+ext;
}

function drawBackground(id){
	//---DRAW SCHEDULE BACKGROUND---
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF";
	ctx.rect(0,0,750,530);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "#EEFFFF";
	ctx.strokeStyle = "#999999";
	ctx.rect(50,50,700,480);
	ctx.fill();

	//draw vertical lines and day labels
	for (var l=0; l<7; l++){
		ctx.beginPath();
		ctx.moveTo(l*100+50,0);
		ctx.lineTo(l*100+50,530);
		ctx.stroke();
		ctx.fillStyle = "black"
		ctx.font="16px Georgia";
		ctx.fillText(days[l],l*100+83,30);
	}
	//draw horizontal lines and time labels
	for (var k=0; k<16; k++){
		ctx.beginPath();
		ctx.strokeStyle = "#999999";
		ctx.moveTo(0,k*30+50);
		ctx.lineTo(750,k*30+50);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "#CCCCCC";
		ctx.moveTo(0,(k+0.5)*30+50);
		ctx.lineTo(750,(k+0.5)*30+50);
		ctx.stroke();
		ctx.fillStyle = "black"
		ctx.font="15px Georgia";
		ctx.fillText(time_to_string(k),3,k*30+50);
	}
}

function drawSchedule(json){
	//---DRAW SCHEDULE BACKGROUND---
	var names = [];

	//iterate over the different events
	for (var i=0; i< json.length; i++){ 
		var c = json[i];
		var color = get_random_color(); //new color per set of events
		for (var j=0;j<c.days.length;j++){ 
			if (c.days[j] > -1){ //for every valid day
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.lineWidth="2";
				ctx.strokeStyle="black";
				ctx.globalAlpha = 0.7;

				//draw the rectangle
				ctx.rect(c.days[j]*100+50,c.times[0]*480+50,100,(c.times[1]-c.times[0])*480);
				ctx.fill();
				ctx.stroke();

				//add to list of labels
				names.push({name: c.eventname, x: c.days[j]*100+55, y: (c.times[0])*480+65});
			}
		}
	}

	//set up context to draw labels
	ctx.globalAlpha = 1;
	ctx.lineWidth = "3";
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	ctx.font="14px Georgia";

	//draw labels on top, so if there are conflicts the labels are still visible
	for (var t=0; t<names.length;t++){
		var label = names[t];
		//alert(label.name);
		ctx.strokeText(label.name,label.x,label.y);
		ctx.font="14px Georgia";
		ctx.fillText(label.name,label.x,label.y);
	}
}
