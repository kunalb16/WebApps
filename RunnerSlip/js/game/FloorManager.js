/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

GAME.FloorManager = function(engine)
{
	this.engine = engine;
	this.count = 0;
	this.floors = [];
	this.floorPool = new GAME.GameObjectPool(GAME.Floor);
}

// constructor
GAME.FloorManager.constructor = GAME.FloorManager;

GAME.FloorManager.prototype.update = function()
{
	for ( var i = 0; i < this.floors.length; i++) 
	{
		var floor = this.floors[i];
		floor.position.x = floor.x - GAME.camera.x -16;
		
		if(floor.position.x < -1135 - GAME.xOffset -16)
		{
			this.floorPool.returnObject(floor)
			this.floors.splice(i, 1);
			i--;
			this.engine.view.gameFront.removeChild(floor);
		}
	}

	
}

GAME.FloorManager.prototype.addFloor = function(floorData)
{
	var floor = this.floorPool.getObject();
	floor.x = floorData;
	floor.position.y = 640 - 158;
	this.engine.view.gameFront.addChild(floor);
	this.floors.push(floor);
}

GAME.FloorManager.prototype.destroyAll = function()
{
	for (var i = 0; i < this.floors.length; i++) 
	{
		var floor = this.floors[i];
		console.log(floor);
			// remove!
		this.floorPool.returnObject(floor);
		this.engine.view.gameFront.removeChild(floor);
	}
	
	this.floors = [];
}


GAME.Floor = function()
{
	PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("00_forest_floor.png"));
	/*
	// add the edge?
	var grassEdgeRight = PIXI.Sprite.fromFrame("00_forest_floor_leftEdge.png");
	grassEdgeRight.position.y = 158 -116  -42;
	grassEdgeRight.position.x = 1134;
	this.addChild(grassEdgeRight);
	
	
	var grassEdgeLeft = PIXI.Sprite.fromFrame("00_forest_floor_rightEdge.png");
	grassEdgeLeft.position.y = 158 -116 -42;
	grassEdgeLeft.position.x = -15;
	this.addChild(grassEdgeLeft);*/
}



GAME.Floor.constructor = PIXI.Floor;
GAME.Floor.prototype = Object.create( PIXI.Sprite.prototype );

