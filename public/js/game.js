define([], function(){




    function initGame(challenge)
    {
	this.challenge = challenge;
	this.score = 0;
	for (var i = 0; i < challenge.balls.length; i++)
	{
	    this.gameballs[i] = {};
	    this.gameballs[i].x = challenge.balls[i].x;
	    this.gameballs[i].y = challenge.balls[i].y;
	}

    }

    function update(dt)
    {	
	var done = this.gameballs.length;
	
	for (var i = 0; i < this.gameballs.length; i++){
	    if(this.gameballs[i].valid){
		var newX;
		var newY;
		newX = this.gameballs[i].x + dt*
		    this.challenge.dx(this.gameballs[i].x,this.gameballs[i].y);
		newY = this.gameballs[i].y + dt*
		    this.challenge.dy(this.gameballs[i].x,this.gameballs[i].y);
		
		for (var o = 0; o < this.challenge.obstacles.length; o++){
		    if (inRect({x:newX,y:newY},this.challenge.obstacles[o])){
			this.gameballs[i].points = -1;
			this.gameballs[i].valid = false;
		    }
		}
		
		if (inRect({x:newX,y:newY},goal)){
		    console.log("goal!");
		    this.gameballs[i].valid = false;
		    this.gameballs[i].points = 1;
		}
		
		if (inRect({x:newX,y:newY},board) && balls[i].valid){
		    this.gameballs[i].x = newX;
		    this.gameballs[i].y = newY;
		}
	    }
	    else{done--;}
	}
	if(!done) return null;
	
	for (var i = 0; i < balls.length; i++){
	    score += this.gameballs[i].points;
	}
	
	return this.gameballs;
    }
    
    return {"init" : initGame,
	    "update": update,
	   "gameballs": []};

});
