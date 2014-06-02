define([], function(){
	
	function forwardTrace(ball, dx, dy) {
	    
	}
	
	function backwardTrace(ball, dx, dy) {
	    
	}
	
	function makeBoard(goalX, goalY, goalWidth, goalHeight, dx, dy, numBalls, numObstacles) {
	    //initiate random stream
	    var randomStream = new RandomStream(0); //arbitrary seed for now
	    
	    //position balls around edges of goal
	    //just white noise for now, can experiment with Perlin noise in future
	    //really should make a ball object
	    var balls = [];
	    for (i=0; i<numBalls; i++) {
		var position = randomStream.nextIntRange(2*goalWidth + 2*goalHeight);
		if (position < goalWidth) {
		    balls.push({x: goalX + position, y: goalY});
		} else if (position < goalWidth+goalHeight) {
		    balls.push({x: goalX + goalWidth, y: goalY + position - goalWidth});
		} else if (position < 2*goalWidth+goalHeight) {
		    balls.push({x: goalX + goalWidth - (position - (goalWidth + goalHeight)), 
				y: goalY + goalHeight});
		} else {
		    balls.push({x: goalX, y: goalY + goalHeight - (position - (2*goalWidth + goalHeight))});
		}
	    }
	    
	    //trace balls out
	    
	    
	    //trace balls back, and record paths
	    //(check that each ball makes it back and replace if not)
	    //place obstacles
	    var obstacles = [];
	    //place obstacle, check if it blocks a path, if so remove it
	    
	    //put ball and obstacle arrays in a board object
	    //wasn't sure what to put for the board so I copied it from web.js
	    var game = {balls: balls, 
			board: {x:2, y:1, width:16, height:14}, 
			goal: {goalX, goalY, goalWidth, goalHeight}, 
			obstacles: obstacles};
	    return game;
	}
	
	function init(seed) {
	    
	    /*
	      order in which new things are introduced: 
	      constants--positive 
	      all constants
	      linear polynomials
	      other polynomials
	      trig functions--sin and cos first, tan later
	      exponential
	      
	      number of seeds per problem type: 
	      1000
	      
	      correlation between numGoals, numBalls, numObstacles, and seed: tbd
	      first few levels: one ball
	      later: 1-3 balls
	      for now: one goal
	      numObstacles: more might make the "real" solution more obvious, less gives more freedom to use other solutions
	      have fewer goals when a new concept is introduced, increase as player gets more practice
	      
	      possibly have seeds right after a new concept is introduced guarantee that particular concept is used
	      
	      could also inject nonrandom levels ("tutorials") when new concept is introduced
	      this would facilitate making a clear distinction between tutorial for new concept and 
	      regular play, wherein any concept may be needed
	     */
	    
	    //figure out what types of problems are 
	    //available based on seed
	    
	    //choose number of goals and obstacles based on seed
	    
	    //create random stream
	    
	    //choose problem type--constants, trig functions, etc.
	    //choose other details
	    
	    //place balls and goals
	    
	    //place obstacles
	   
	    /*
	      Two possibilities: we find an integration techniques that backtracks without error, 
	      or we don't.  
	      
	      Possibility 1: 
	      1) place the goal
	      2) place balls around the edges of the goal
	      3) send balls outward from goal
	      4) check to see if any balls stayed on the goal and remove/replace them
	      
	      Possibility 2: 
	      1) create a 2D int array [boardWidth/goalWidth, boardHeight/goalHeight]
	      2) loop: 
	          randomly place a ball
		  trace ball's path
		  if ball is off board, continue
		  if ball enters new square in grid, increment the corresponding entry in the array
		       if squareCount>minDistance 
		            if array[currX, currY]==numBalls 
			         place goal
				 break
	      3) place balls whose paths intersect goal
	      
	      Better option for Possibility 2: 
	      1) follow instructions for Possibility 1
	      2) retrace the balls in towards goal to make sure any backtracking error is not a problem
	      3) if a ball does not hit the goal, remove it and add a new ball
	      4) make sure the saved ball paths are the ones leading towards the goal
	     */


 
	    function placeGoals() {
		//preferably find a spot where stuff converges
	    }
	    
	    function placeBalls() {
		//need an efficient way of picking locations which will
		//lead to the goal(s)
		//keep track of the paths that the balls will take to get to the goal
	    }
	    
	    function placeObstacles(numObstacles) {
		
		function checkForBlockage() {
		    //check to see if obstacle intersects any of the ball paths
		}
		//for numObstacles: 
		//randomly place obstacle
		//check if it messes up the solution
		//if yes, remove and try again
		//if more than maxAttempts attempts to place obstacle fail, break
		//else leave it
	    }
	}
	
	return {
	    'init': init, 
	    'makeBoard': makeBoard
	};
	
	/*	
	function one(){
	    //code
	}
	
	function two(){
	    //code
	}
	
	return {
	    ‘one': one,
’two': two
		};
	*/
    });