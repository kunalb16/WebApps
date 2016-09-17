/**
 * @author Mat Groves
 */
var GAME = GAME || {};
GAME.HIGH_MODE = true;
GAME.camera = new PIXI.Point();
GAME.height;

GAME.RprEngine = function()
{
	this.onGameover;
	
	this.steve = new GAME.Steve();
	this.view = new GAME.RprView(this);
	this.segmentManager = new GAME.SegmentManager(this);
	this.enemyManager = new GAME.EnemyManager(this);
	this.pickupManager = new GAME.PickupManager(this);
	this.floorManager = new GAME.FloorManager(this);
	this.collisionManager = new GAME.CollisionManager(this);
	this.view.game.addChild(this.steve.view);
	
	this.bulletMult = 1;
	
	this.pickupCount = 0;
	
	this.score = 0;
	this.joyrideMode = false;
	this.joyrideCountdown = 0;
	this.steve.view.visible =  false;
	this.isPlaying = false;
	
	this.levelCount = 0;
	
}

GAME.RprEngine.prototype.start = function()
{
	//console.log(":::")
	this.isPlaying = true;
	this.score = 0;
	this.steve.level = 1;
	this.steve.position.y = 477;
	this.steve.speed.y = 0;
	this.steve.speed.x = 	this.steve.baseSpeed;
	this.steve.view.rotation = 0;
	this.steve.isFlying = false;
	this.steve.isDead = false;
	this.steve.view.play()
	this.steve.view.visible = true;
	this.segmentManager.chillMode = false;
	
	this.bulletMult = 1;
	this.segmentManager.reset();
//		this.steve.position.x = 3500;
	this.enemyManager.destroyAll();
	this.pickupManager.destroyAll();
}

GAME.RprEngine.prototype.update = function()
{
	GAME.time.update();
	
	var targetCamY = 0//this.steve.position.y - GAME.height/2;
	if(targetCamY > 0)targetCamY = 0;
	if(targetCamY < -70)targetCamY = -70;
	
	GAME.camera.y = targetCamY//(targetCamY - GAME.camera.y) * 0.01// - 200;
	
	this.steve.update();
	this.collisionManager.update();
	this.segmentManager.update();
	this.floorManager.update();
	this.enemyManager.update();
	this.pickupManager.update();


	if(this.joyrideMode )
	{
		this.joyrideCountdown-= GAME.time.DELTA_TIME;
		
		if(this.joyrideCountdown <= 0)
		{
			this.joyrideComplete();
		}
	}
	/*
	if(this.isPlaying)
	{
	//	this.score += 0.1 * GAME.time.DELTA_TIME;
	}*/
	
	this.levelCount+=GAME.time.DELTA_TIME;
	
	if(this.levelCount > 60 * 60)
	{
		this.levelCount = 0;
		this.steve.level += 0.05;
		GAME.time.speed += 0.05;
	}
	
	this.view.update();
	
}

GAME.RprEngine.prototype.reset = function()
{
	this.enemyManager.destroyAll();
	this.floorManager.destroyAll();
	
	this.segmentManager.reset();
	this.view.zoom = 1;
	this.pickupCount = 0;
	this.levelCount = 0;
	this.steve.level = 1;
	
	this.view.game.addChild(this.steve.view);
}

GAME.RprEngine.prototype.joyrideComplete = function()
{
	this.joyrideMode = false;
	this.pickupCount = 0;
	this.bulletMult += 0.3;
	this.view.normalMode();
	this.steve.normalMode();
	this.enemyManager.destroyAll();
}

GAME.RprEngine.prototype.gameover = function()
{
	this.isPlaying = false;
	this.segmentManager.chillMode = true;
	interactive = false;
	this.onGameover();
	
	this.view.game.addChild(this.steve.view);
	
	TweenLite.to(this.view, 0.5, {zoom:2, ease:Cubic.easeOut});
}

GAME.RprEngine.prototype.gameoverReal = function()
{
	this.onGameoverReal();
}

GAME.RprEngine.prototype.pickup = function()
{
	if(this.joyrideMode)
	{
		this.score += 10;
		return;
	}
	
	this.score += 10;
	
	this.view.score.jump();
	this.pickupCount++;
	if(this.pickupCount >= 50 * this.bulletMult && !this.steve.isDead)
	{
		this.pickupCount = 0;
		this.joyrideMode = true;
		
		//this.view.joyBackground.startTrain();
		this.joyrideCountdown = 60 * 10
		this.view.joyrideMode();
		this.steve.joyrideMode();
	//	this.pickupManager
		//this.enemyManager.destroyAll();
		//this.pickupManager.destroyAll();
		//this.floorManager.destroyAll();
		
		this.steve.position.x = 0;
		GAME.camera.x = game.steve.position.x - 100;
//		this.steve.position.x = 3500;
		this.enemyManager.destroyAll();
		this.pickupManager.destroyAll();
		this.floorManager.destroyAll();
	
		this.segmentManager.reset();
//		this.segmentManager.reset();
	}
}

Time = function()
{
	this.DELTA_TIME = 1;	
	this.lastTime = Date.now();
	this.frames = 0;
		this.speed = 1;
}

Time.constructor = Time;

Time.prototype.update = function()
{
	
	this.frames ++;

	//if(this.frames > 30)
	//{
		var time = Date.now();
		
		this.frames = 0;
		
		var currentTime =  time;
		var passedTime = currentTime - this.lastTime;
	//	console.log(passedTime)
		//if(passedTime > 3000)passedTime = 3000;
	
		///this.DELTA_TIME = passedTime ;
//				1 = 17  // 60??
		this.DELTA_TIME = ((passedTime) * 0.06);
		
		this.DELTA_TIME *= this.speed;
		
		if(this.DELTA_TIME > 2.3)this.DELTA_TIME = 2.3;
		
	//	console.log(this.DELTA_TIME);
//			trace(DELTA_TIME);
		// 60 ---> 1
		// 30 ---> 2
	//	this.DELTA_TIME =1//2.3;
		this.lastTime = currentTime;
	//}
	
}

// create an instance!
GAME.time = new Time();
