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

function drawBall(ball){
	ctx.fillStyle = "#FF0000";
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
   	ctx.arc((ball.x-board.x)/board.width*frame.width, 
   		frame.height-(ball.y-board.y)/board.height*frame.height,
   		10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}
