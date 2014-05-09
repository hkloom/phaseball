/*
=================================================

PHASEBALL
Tai Rodrig
April-May 2014

DRAWING FUNCTIONS FOR DISPLAYING THE CHALLENGE

=================================================
*/

// Just some shorthand
function sin(x){  return Math.sin(x); }
function cos(x){  return Math.cos(x); }
function tan(x){  return Math.tan(x); }
function exp(x){  return Math.exp(x); }
function sqrt(x){ return Math.sqrt(x); }
function sinh(x){ return (exp(x)-exp(-x))/2; }
function cosh(x){ return (exp(x)+exp(-x))/2; }


//---GLOBAL VARS---
frame = {x:0,y:0,width:800,height:600};



//---HELPER FUNCTIONS---
//is the ball currently in the rectangle?
function inRect(ball,rect){
	return (ball.x >= rect.x && 
		ball.x <= rect.x + rect.width &&
		ball.y >= rect.y && 
		ball.y <= rect.y + rect.height);
}


//---DRAWING FUNCTIONS---

function drawLine(layer,line,color){
	var line = new Kinetic.Line({
		        points: [line.A.x, line.A.y, line.B.x, line.B.y],
		        stroke: color,
		        strokeWidth: 2,
		      });
	layer.add(line);
}

function drawBall(layer,ball,board,color){
	//console.log("layer width: "+ layer.width() );
	var circ = new Kinetic.Circle({
		x: (ball.x-board.x)/board.width*layer.width(),
		y: layer.height()*(1-((ball.y-board.y)/board.height)),
		radius: 5,
		fill: color,
		stroke: 'black',
		strokeWidth: 0
	});



	// add the shape to the layer
	layer.add(circ);
	return circ
}


function drawBalls(layer,balls,board,color){
	var circs = [];
	for (var i=0; i<balls.length;i++){
		//console.log(balls[i]);
		//alert(JSON.stringify(obstacles[i], null, 4));
		circs.push(drawBall(layer,balls[i],board,color));
	}
	return circs;
}

function drawRect(layer,goal,board,color){
	//console.log("layer width: "+ layer.width() );
	var rect = new Kinetic.Rect({
		x: (goal.x-board.x)/board.width*layer.width(),
		y: layer.height()*(1-((goal.y-board.y)/board.height)),
		width: goal.width/board.width*layer.width(),
		height: -goal.height/board.height*layer.height(),
		fill: color,
		stroke: 'black',
		strokeWidth: 2
	});
	// add the shape to the layer
	layer.add(rect);
	//console.log(rect);
}


function drawObstacles(layer,obstacles,board,color){
	for (var i=0; i<obstacles.length;i++){
		//alert(JSON.stringify(obstacles[i], null, 4));
		drawRect(layer,obstacles[i],board,color);
	}
}

function drawBackground(layer, board){
	//---DRAW BOARD BACKGROUND---
	drawRect(layer,{x: layer.x(),
					y: layer.y(),
					width:layer.width(),
					height:layer.height()},board, "#FFFFFF");
	//draw vertical lines and labels
	var xinterval = layer.width() / board.width;
	for (var l=0; l<board.width; l++){
		if (l>0){
			var line = {A: {x: l*xinterval, y:layer.x()},
						B: {x: l*xinterval, y:layer.x()+layer.height()}};
			drawLine(layer,line,"#DDDDDD");
		}
		var text = new Kinetic.Text({
		  x: l*xinterval+2,
		  y: layer.height()-15,
		  text:  "("+ +(l+board.x)+","+ (board.y)+")",
		  fontSize: 12,
		  fontFamily: 'Calibri',
		  fill: 'black'
		});
		layer.add(text);
	}
	//draw horizontal lines and labels
	var yinterval = layer.height() / board.height;
	for (var l=1; l<board.height; l++){
		var line = {A: {x: layer.x(), y:l*yinterval},
					B: {x: layer.x()+layer.width(), y:l*yinterval}};
		drawLine(layer,line,"#DDDDDD");
		var text = new Kinetic.Text({
		  x: 2,
		  y: l*yinterval-15,
		  text:  "("+ board.x +","+ +(board.height-l+board.y) +")",
		  fontSize: 12,
		  fontFamily: 'Calibri',
		  fill: 'black'
		});
		layer.add(text);
	}
}

function reset(layer,balls,originalballs){
	console.log(balls);
	drawing = false;
	var bz = layer.getChildren();
	for (var i = 0; i < balls.length; i++){
		console.log("ball "+i+" has coordinates ("+balls[i].x+","+balls[i].y+")");
		console.log("setting ball "+i+" to coordinate ("+originalballs[i].x+","+originalballs[i].y+")");
		balls[i].x = originalballs[i].x;
		balls[i].y = originalballs[i].y;
		console.log("now ball "+i+" has coordinates ("+balls[i].x+","+balls[i].y+")");
		bz[i].x((balls[i].x-board.x)/board.width*layer.width());
		bz[i].y(layer.height()*(1-((balls[i].y-board.y)/board.height)));
	}
	score = balls.length;
	$("div.score").replaceWith("<div align = 'center' class = 'score'>SCORE: "+score+"</div>");
	layer.draw();
}
