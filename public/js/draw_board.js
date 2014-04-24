/*
=================================================

Schedule Prettifier
Tai Rodrig
April 2014

DRAWING FUNCTIONS FOR DISPLAYING THE SCHEDULE

=================================================
*/


//---GLOBAL VARS---
frame = {x:0,y:0,width:600,height:400};
board = {x:4,y:3,width:6,height:4};

//--HELPER FUNCTIONS---

function drawBackground(id){
	//---DRAW BOARD BACKGROUND---
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF";
	ctx.rect(frame.x,frame.y,frame.width,frame.height);
	ctx.fill();

	//draw vertical lines and labels
	var xinterval = frame.width / board.width;
	for (var l=0; l<board.width; l++){
		if (l>0){
			ctx.beginPath();
			ctx.strokeStyle = "#666666";
			ctx.moveTo(l*xinterval,frame.x);
			ctx.lineTo(l*xinterval,frame.x+frame.height);
			ctx.stroke();
		}
		ctx.fillStyle = "black"
		ctx.font="16px Georgia";
		var fmtstr = "("+ +(l+board.x)+","+ (board.y)+")";
		ctx.fillText(fmtstr,l*xinterval+5,frame.height-15);
	}
	//draw horizontal lines and labels
	var yinterval = frame.height / board.height;
	for (var l=1; l<board.height; l++){
		ctx.beginPath();
		ctx.strokeStyle = "#666666";
		ctx.moveTo(frame.x,l*yinterval);
		ctx.lineTo(frame.x+frame.width, l*yinterval);
		ctx.stroke();
		ctx.fillStyle = "black"
		ctx.font="16px Georgia";
		var fmtstr = "("+ board.x +","+ +(board.height-l+board.y) +")";
		ctx.fillText(fmtstr,5,l*yinterval-15);
	}
}

function drawSchedule(json){
	//---DRAW BOARD ---
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
