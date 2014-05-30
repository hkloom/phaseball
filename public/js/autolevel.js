define([], function(){
	
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
	    'init': init
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