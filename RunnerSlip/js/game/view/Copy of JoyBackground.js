/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

GAME.JoyBackground = function(background)
{
	this.background = background;
	
	PIXI.DisplayObjectContainer.call( this );
	this.width = 1000;
	this.scrollPosition = 1500;
	var SCALE =1// 0.5
	this.pos = 4000;
	
	this.trainFront = PIXI.Sprite.fromImage("img/trainFront.jpg");
	this.trainBack = PIXI.Sprite.fromImage("img/trainRear.jpg");
	this.trainMiddle = PIXI.Sprite.fromImage("img/trainMiddle.jpg");
	
	this.middles = [];
	
	for (var i=0; i < 2; i++) 
	{
		var middle = PIXI.Sprite.fromImage("img/hyperTile.jpg")
		this.middles.push(middle);
		this.addChild(middle);
		middle.scale.y = 2;
		middle.visible = false;
	}
	
	//this.swoosh = new GAME.BackgroundElement(PIXI.Texture.fromImage("img/trainMiddle.jpg"), 0 , this);
	//this.swoosh.speed = 2.7
	this.addChild(this.trainFront);
	this.addChild(this.trainBack);
	
	this.trainActive = false;
	this.visible = false;
	//this.alpha = 0.5;
	this.trainFront.visible = false;
	this.trainBack.visible = false;

}

// constructor
GAME.JoyBackground.constructor = GAME.JoyBackground;

GAME.JoyBackground.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.JoyBackground.prototype.startTrain = function()
{
	if(this.trainActive)return;
	
	var pos = GAME.camera.x//0;
	
	this.trainActive = true;
	this.visible = true;
	this.pos = GAME.width;
	this.offset = 0// -GAME.camera.x 
	this.trainFront.visible = true;
	this.trainBack.visible = true;
	//if(pos > 1033)
}

GAME.JoyBackground.prototype.updateTransform = function()
{
	if(!this.trainActive)return;
	this.pos -= 30 * GAME.time.DELTA_TIME//GAME.camera.x +0// * GAME.time.DELTA_TIME;
	
	var realpos = this.pos - this.offset;
	var len = 891//1063;
	var size = 15;
	
	for (var i=0; i < this.middles.length; i++) 
	{
		var middle = this.middles[i];
		var newPos =  realpos+1033 + (i * len);
		
		middle.visible = (newPos > len * -(size-1) && newPos < 1033 + len)
		
		newPos %= len*2;
		if(newPos < 0)newPos +=  len*2;
		
		newPos -= len;
		middle.position.x = newPos;
	}
	
	this.trainFront.position.x = 	realpos// GAME.width;
	this.trainFront.position.visible = this.trainFront.position.x > -1033;
	
	this.trainBack.position.x = realpos + len * size;
	this.trainBack.position.visible = this.trainBack.position.x < GAME.width;
	//
	
	if(realpos < 0)
	{
		if(realpos <  - len * size)
		{
			this.background.visible = true;
			
			if(realpos <  - len * size - 1033)
			{
				this.trainActive = false;
				this.visible = false;
				this.onComplete();
			}
		}	
		else
		{
			this.background.visible = false;
		}
	}
	else
	{
		this.background.visible = true;
	}
		
	
	//his.swoosh.setPosition(this.scrollPosition);
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}


