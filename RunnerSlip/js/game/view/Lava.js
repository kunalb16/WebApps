/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};


GAME.Lava = function(owner)
{
	this.textures = [PIXI.Texture.fromFrameId("lava_slosh_01.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_02.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_03.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_04.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_05.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_06.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_07.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_08.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_07.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_06.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_05.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_04.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_03.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_02.png"),
	                 PIXI.Texture.fromFrameId("lava_slosh_01.png")];
	
	console.log( this.textures)
	var texture = this.textures[0];
	
	this.sprites = [];
	this.spriteWidth = texture.width-1;
	var amount = 8//Math.ceil(940 / this.spriteWidth);
	if(amount < 3)amount = 3;
	console.log(amount);
	
	for (var i=0; i < amount; i++) 
	{
		var sprite = new PIXI.Sprite(texture);
		sprite.position.y = 580;
		owner.addChild(sprite);
		this.sprites.push(sprite);
	};	
				  
	this.speed = 1;
	this.offset = 0;
	this.count = 0;
}

GAME.Lava.prototype.setPosition = function(position)
{
	var h = this.spriteWidth;
	var frame = ( this.count) % this.textures.length;
	frame = Math.floor(frame);
	
	this.offset += 2.5
	
	position += this.offset;
	
	this.count += 0.3;
	for (var i=0; i < this.sprites.length; i++) 
	{
		var pos = -position * this.speed;
		pos += i *  h ;
		pos %=  h * this.sprites.length ;
		pos +=  h * 2;
		
		this.sprites[i].setTexture(this.textures[frame])
		this.sprites[i].position.x = Math.floor(pos) + 800 - GAME.xOffset// + 1
		
		//this.sky[i].position.y = Math.round(this.sky[i].position.y);
	};	
}
/*
var GAME = GAME || {};

GAME.Background = function()
{
	PIXI.DisplayObjectContainer.call( this );
	/*
	this.texture = new PIXI.Texture("img/floor.png");
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