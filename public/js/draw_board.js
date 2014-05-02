/*
=================================================

Schedule Prettifier
Tai Rodrig
April 2014

DRAWING FUNCTIONS FOR DISPLAYING THE SCHEDULE

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

function drawBallsPath(layer,balls,goal,obstacles,board,equation){
	console.log("drawing paths");
	var step = 0.01;
	for (var k=0;k<balls.length;k++){
		( function() {
			var b = balls[k]; //$.extend({},balls[k]); //clones object
			var dead = false;
			while(inRect(b,board) && !dead){

				b.x += step*equation.dx(b.x,b.y);
				b.y += step*equation.dy(b.x,b.y);
				//console.log("drawing ball");
				//drawBall(layer,b,board,"#FF0000");
				if (inRect(b,goal)){
					console.log("ball "+i+" hit goal!!");
					break;
				}
				for (var i=0; i<obstacles.length;i++){
					if (inRect(b,obstacles[i])){
						console.log('ball '+i+'hit obstacle!');
						dead = true;
						break;
					}
				}
			}
		})();
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
