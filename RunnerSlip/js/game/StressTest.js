/**
 * @author Mat Groves http://matgroves.com/
 */
var PIXI = PIXI || {};


PIXI.StressTest = function(callback)
{
	this.callback = callback;
	this.stage = new PIXI.Stage();
	this.renderer = PIXI.autoDetectRenderer(500, 500);
	document.body.appendChild(this.renderer.view);
	this.cover = document.createElement("div");
	this.cover.style.width = this.cover.style.height = "500px";
	this.cover.style.background = "#25284a";
	
	document.body.appendChild(this.cover);
	
	this.renderer.view.style.position = "absolute";
	this.cover.style.position = "absolute";
	this.cover.style.zIndex = 2;
	//this.renderer.view.style.display = "none";
	//
	this.duration = 3;
	
	var scope = this;
	this.texture = PIXI.Texture.fromImage("img/testImage.png");
	this.texture.baseTexture.addEventListener( 'loaded', function(){ scope.begin()} );
	
	this.frameRate = [];
}

// constructor
PIXI.StressTest.constructor = PIXI.StressTest;

PIXI.StressTest.prototype.begin = function()
{
	this.testSprites = [];
	for (var i=0; i < 300; i++) 
	{
		var bunny = new PIXI.Sprite(this.texture);
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;
		this.stage.addChild(bunny);
		bunny.position.x = 50 + Math.random() * 400; 
		bunny.position.y = 50 + Math.random() * 400; 
		
		this.testSprites.push(bunny);
	};
	
	this.renderer.render(this.stage);
	
	this.startTime = Date.now();
	this.lastTime = Date.now();
	
	var scope = this
	requestAnimFrame(function(){scope.update()});
}

PIXI.StressTest.prototype.update = function()
{
	var currentTime = Date.now();
	
	for (var i=0; i < this.testSprites.length; i++) {
	  this.testSprites[i].rotation += 0.3;
	};
	
	this.renderer.render(this.stage);
	
	var diff = currentTime - this.lastTime;
	diff *= 0.06;
	
	//diff *= 60;
	
	this.frameRate.push(diff);
	
	this.lastTime = currentTime;
	
	var elapsedTime = currentTime - this.startTime;
	
	if(elapsedTime < this.duration * 1000)
	{
		var scope = this
		requestAnimFrame(function(){scope.update()});
		
	}
	else
	{
		// end!
	//	console.log(this.frameRate);
	//	console.log(this.frameRate.length/this.duration);
	//	alert(this.frameRate.length/this.duration)
		document.body.removeChild(this.renderer.view);
		document.body.removeChild(this.cover);
		
		this.cover = null;
		this.renderer = null;
		
	//	this.renderer.dispose();
//		this.stage.dispose()
		this.result = this.frameRate.length/this.duration;
		
		
		if(this.callback)this.callback();
	}
	
}



