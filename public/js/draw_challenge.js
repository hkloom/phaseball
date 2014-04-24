/*
=================================================

Phase Ball
Tai Rodrig
April 2014

DRAWING FUNCTIONS FOR DISPLAYING THE CHALLENGE

=================================================
*/

//board = {x:0, y:0, width:750, height:530};

//is the ball currently in the rectangle?
function in(ball,rect){
	return (ball.x >= rect.x && ball.x <= rect.x + rect.width && ball.y >= rect.y && ball.y <= rect.y + rect.height);
}

function draw_ball_path(ball,equation){
	while (in(ball,board)){

	}
}

function drawBackground(id){
	canvas = document.getElementById(id);
	ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF";
	ctx.rect(0,0,750,530);
}