/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

GAME.Background = function()
{
	PIXI.DisplayObjectContainer.call( this );
	
	this.scrollPosition = 0;
	//{"x":604,"y":803,"w":600,"h":799},
	//{"x":1206,"y":2,"w":600,"h":799},
	//{"x":604,"y":2,"w":600,"h":799},
	this.floor = [PIXI.Sprite.spriteFromFrame("shmupBG_mid.jpg"),
				  PIXI.Sprite.spriteFromFrame("shmupBG_bot.jpg"),
				  PIXI.Sprite.spriteFromFrame("shmupBG_top.jpg")];
	
	//{"x":0,"y":0,"w":600,"h":800},
	//{"x":0,"y":0,"w":600,"h":800}
	this.sky = [PIXI.Sprite.spriteFromFrame("cloudsFORE_bot.png"),
				PIXI.Sprite.spriteFromFrame("cloudsFORE_top.png")];
	
//	this.alpha = 0.5
	for (var i=0; i < this.floor.length; i++) 
	{
		this.addChild(this.floor[i]);
	};	
	
	for (var i=0; i < this.sky.length; i++) 
	{
		this.addChild(this.sky[i]);
	};	
}

// constructor
GAME.Background.constructor = GAME.Background;

GAME.Background.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.Background.prototype.updateTransform = function()
{
	this.scrollPosition += 5 * GAME.time.DELTA_TIME;
	var pos;
	
	for (var i=0; i < this.floor.length; i++) 
	{
		pos = this.scrollPosition + i * 799;
		pos %= 799 * 3;
		pos -= 799;
		
		this.floor[i].position.y = pos
	};	
	
	var h = 800;
	
	for (var i=0; i < this.sky.length; i++) 
	{
		pos = this.scrollPosition * 1.4;
		pos += i *  h ;
		pos %=  h  * 2;
		pos -=  h ;
		
		this.sky[i].position.y = pos
		//this.sky[i].position.y = Math.round(this.sky[i].position.y);
	};	

	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

/*
var GAME = GAME || {};

GAME.Background = function()
{
	PIXI.DisplayObjectContainer.call( this );
	/*	this.texture = new PIXI.Texture("img/floor.png");
	//this.
	
	this.sprites = [new PIXI.Sprite(this.texture, {x:1206,y:2,width:600,height:799}),
					new PIXI.Sprite(this.texture, {x:604,y:2,width:600,height:799}),
					new PIXI.Sprite(this.texture, {x:2,y:2,width:600,height:799}) ];
	
	for (var i=0; i < this.sprites.length; i++) 
	{
	//	this.addChild(this.sprites[i]);
	};				
	*/
//}

// constructor
//GAME.Background.constructor = GAME.Background;
//GAME.Background.protoype = Object.create( PIXI.DisplayObjectContainer.prototype );

/*
GAME.Background.prototype.updateTransform = function()
{
	
}*/