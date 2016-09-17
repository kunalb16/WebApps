/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

GAME.JoyBackground = function()
{
	PIXI.DisplayObjectContainer.call( this );
	this.width = 1000;
	this.scrollPosition = 1500;
	var SCALE =1// 0.5
	this.foggyTrees = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("05_far_BG.jpg"), 40 , this);
	
	this.foggyTrees.speed = 1/2;
}

// constructor
GAME.JoyBackground.constructor = GAME.JoyBackground;

GAME.JoyBackground.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.JoyBackground.prototype.updateTransform = function()
{
	this.scrollPosition = GAME.camera.x + 4000// * GAME.time.DELTA_TIME;

	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}


}*/