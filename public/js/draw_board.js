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

//---HELPER FUNCTIONS---


//is the ball currently in the rectangle?
function inRect(ball,rect){
	return (ball.x >= rect.x && ball.x <= rect.x + rect.width && ball.y >= rect.y && ball.y <= rect.y + rect.height);
}


//---DRAWING FUNCTIONS---

function drawBackground(id, board){
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

function drawBall(id,ball,board){
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
   	ctx.arc((ball.x-board.x)/board.width*frame.width, 
   		frame.height-(ball.y-board.y)/board.height*frame.height,
   		5, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawRect(id,goal,board, color){
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
   	ctx.rect((goal.x-board.x)/board.width*frame.width, 
   		frame.height-(goal.y-board.y)/board.height*frame.height,
   		goal.width/board.width*frame.width,
   		-goal.height/board.height*frame.height
   		);
    ctx.fill();
    ctx.stroke();
}

function drawObstacles(id,obstacles,board,color){
	for (var i=0; i<obstacles.length;i++){
		//alert(JSON.stringify(obstacles[i], null, 4));
		drawRect(id,obstacles[i],board,color);
	}
}

function drawBallPath(id,ball,goal,obstacles,board,equation){
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	var step = 0.01;
	var b = $.extend({},ball); //clones object
	//drawBoard(b,)
	//drawBall(id,b,board);
	while(inRect(b,board) && !dead){
		var dead = false;
		b.x += step*equation.dx(b.x,b.y);
		b.y += step*equation.dy(b.x,b.y);
		drawBall(id,b,board);
		if (inRect(b,goal)){
			alert("hit goal!!");
			break;
		}
		for (var i=0; i<obstacles.length;i++){
			if (inRect(b,obstacles[i])){
				alert('hit obstacle!');
				dead = true;
				break;
			}
		}
	}
	//alert("ball left screen");
}
