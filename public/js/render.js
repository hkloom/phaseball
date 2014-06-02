define([], function(){

    /*
      =================================================
      
      PHASEBALL
      Tai Rodrig
      April-May 2014

      DRAWING FUNCTIONS FOR DISPLAYING THE CHALLENGE

      =================================================
    */

     var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
          
      function getRandomColor() {
          return colors[Math.round(Math.random() * 5)];
      }
    function drawPrettyBackground(layer, game){
     var board = game.challenge.board;
     //return;
     for(var k =0; k <=1000; k++){
       var xp = Math.random() * board.width;
       var yp = Math.random() * board.height;
       var points = [];
       for(var i =0; i <= 40; i++){
	 var xr = (xp - board.x)/board.width*layer.width();
	 var yr = (1-(yp - board.y)/board.height)*layer.height();
         points.push(xr);
	 points.push(yr);
           var p = game.nextP(xp, yp,0.05);
           xp = p.x;
	   yp = p.y;
         }

         var line = new Kinetic.Line({
                  points: points,
                  stroke: getRandomColor(),
                  strokeWidth: 1,
                  lineCap: 'round',
                  lineJoin: 'round'
              });
         layer.add(line);
       }

     }  

    function inRect(ball,rect){
	return (ball.x >= rect.x && 
		ball.x <= rect.x + rect.width &&
		ball.y >= rect.y && 
		ball.y <= rect.y + rect.height);
    }
    
    var stage;
    function init(game,containerName)
    {
	var board = game.board;
	stage = new Kinetic.Stage({
		container: containerName,
		width: 600,
		height: 450
	});
	
     	
	function drawLine(layer,line,color){
	    var line = new Kinetic.Line({
		points: [line.A.x, line.A.y, line.B.x, line.B.y],
		stroke: color,
		strokeWidth: 2,
	    });
	    layer.add(line);
	}
	
	function drawBall(layer,ball,board,color){
	    var circ = new Kinetic.Circle({
		x: (ball.x-board.x)/board.width*layer.width(),
		y: layer.height()*(1-((ball.y-board.y)/board.height)),
		radius: 5,
		fill: color,
		stroke: 'black',
		strokeWidth: 0
	    });
	    layer.add(circ);
	    return circ
	}
	
	
	function drawBalls(layer,balls,board,color){
	    for (var i=0; i<balls.length;i++){
		drawBall(layer,balls[i],board,color);
	    }
	}

	function drawRect(layer,goal,board,color){
	    //console.log(goal);
	    var rect = new Kinetic.Rect({
		x: (goal.x-board.x)/board.width*layer.width(),
		y: layer.height()*(1-((goal.y-board.y)/board.height)),
		width: goal.width/board.width*layer.width(),
		height: -goal.height/board.height*layer.height(),
		fill: color,
		stroke: 'black',
		strokeWidth: 2
	    });
	    layer.add(rect);
	}


	function drawObstacles(layer,obstacles,board,color){
	    for (var i=0; i<obstacles.length;i++){
		drawRect(layer,obstacles[i],board,color);
	    }
	}
	
	function drawBackground(layer, board){
	    drawRect(layer,{x: layer.x(),
			    y: layer.y(),
			    width:layer.width(),
			    height:layer.height()},board, "#FFFFFF");
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
	

	var layer = new Kinetic.Layer({
	    width: stage.width(),
	    height: stage.height()
            
	});
	
	var balllayer = new Kinetic.Layer({
	    width: stage.width(),
	    height: stage.height()
	});

        var obstaclesLayer =  new Kinetic.Layer({
            width: stage.width(),
            height: stage.height()
        });
        
	
//	console.log(game);
	drawBackground(layer, game.challenge.board);
	drawBalls(balllayer, game.gameballs, game.challenge.board, "#FF0000");
	
	drawRect(obstaclesLayer, game.challenge.goal, 
		 game.challenge.board, "#00FF00");
	drawObstacles(obstaclesLayer, game.challenge.obstacles,
		      game.challenge.board, "#882200");
	stage.add(layer);
	stage.add(obstaclesLayer);
	stage.add(balllayer);

        layer.setZIndex(0);
        balllayer.setZIndex(5);
        obstaclesLayer.setZIndex(3);
	stage.draw();
	this.balllayer = balllayer;
    }
    
    function start(game,scoreFunc){
	if(this.running == true) return;
        
        var background = new Kinetic.Layer({
	    width: stage.width(),
            height: stage.height()
	});

        drawPrettyBackground(background, game);
	stage.add(background);
        background.setZIndex(1);

	var balllayer = this.balllayer;
	this.running = true;
	function animate(frame)
	{
	    var boardInstance = game.update(0.05);
	    if(!boardInstance){
		this.stop();
		return;
            }
	    var balls = boardInstance.gameballs;
	    var board = boardInstance.board;
	    
	    var bz = balllayer.getChildren();
	    
	    for (var i = 0; i < balls.length; i++)
	    {
		bz[i].x((balls[i].x-game.challenge.board.x)/
			game.challenge.board.width*balllayer.width());
		bz[i].y(balllayer.height()*
			(1-((game.gameballs[i].y-game.challenge.board.y)/
			    game.challenge.board.height)));
	    }
	    balllayer.draw();
	    scoreFunc(game.score);
	    
	}
	this.anim = new Kinetic.Animation(animate, this.balllayer);
	this.anim.start();
    }
    function stop(){
	this.running = false;
	this.anim.stop();
    }
    return {
	'init': init,
	'start': start,
	'stop' : stop,
        'running' : false,
        'stage' : stage
    };

});

