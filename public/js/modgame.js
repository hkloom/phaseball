define(['mathjs'], function(mathjs){
    var math = mathjs();


    function inRect(ball,rect){
		return (ball.x >= rect.x && 
			ball.x <= rect.x + rect.width &&
			ball.y >= rect.y && 
			ball.y <= rect.y + rect.height);
    }

    function initGame(challenge)
    {
		this.challenge = challenge;
		this.score = 0;
		for (var i = 0; i < challenge.balls.length; i++)
		{
		    this.gameballs[i] = {};
		    this.gameballs[i].x = challenge.balls[i].x;
		    this.gameballs[i].y = challenge.balls[i].y;
		    this.gameballs[i].valid = true;
		    this.gameballs[i].points = 0;
		}
    }

    function update(dt)
    {	
		var done = this.gameballs.length;
		for (var i = 0; i < this.gameballs.length; i++){
		    if(this.gameballs[i].valid){
			var newX;
			var newY;
			var scope = {
			    x : this.gameballs[i].x,
			    y : this.gameballs[i].y
			    };
	        try{
			  newX = this.gameballs[i].x + dt* math.eval(this.dx, scope);
		 	  newY = this.gameballs[i].y + dt* math.eval(this.dy, scope);
			}
	        catch(err){
	          alert(err);
			  return null;
            }		
			for (var o = 0; o < this.challenge.obstacles.length; o++){
			    if (inRect({x:newX,y:newY},this.challenge.obstacles[o])){
					this.gameballs[i].points = -1;
					this.gameballs[i].valid = false;
			    }
			}
			
			if (inRect({x:newX,y:newY},this.challenge.goal)){
			    console.log("goal!");
			    this.gameballs[i].valid = false;
			    this.gameballs[i].points = 1;
			}
			
			if (inRect({x:newX,y:newY},this.challenge.board) && this.gameballs[i].valid){
			    this.gameballs[i].x = newX;
			    this.gameballs[i].y = newY;
			}
			else{
			    this.gameballs[i].valid = false;
			}
		    }
		    else{done--;}
		}
		if(done == 0) return null;
		
		var sum = 0;
		for (var i = 0; i < this.gameballs.length; i++){
		    sum += this.gameballs[i].points;
		}
		this.score = sum;
		
		return {'gameballs': this.gameballs};
	    }
	    
	    return {"init" : initGame,
		    "update": update,
		   "gameballs": []};
});
