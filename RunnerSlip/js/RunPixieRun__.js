

$(document).ready(onReady)

$(window).resize(resize)
window.onorientationchange = resize;


/**
 * Provides bind in a cross browser way.
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}


var GAME_MODE = {TITLE:0, COUNT_DOWN:1, PLAYING:2, GAME_OVER:3, INTRO:4};

var width = 800;
var height = 600;

var isAdding = false;
var loader;
var game;

var mouseX = 0;
var mouseY = 0;
var ratio;
var offsetX;
var offsetY;
var holder;
var loaderView =  document.getElementById("loader");
var loaderText = document.getElementById("loaderText");
var loadInterval
var loadCount = 0;

var gameMode = 0;
var countdown;
var logo;
var black;
var interactive = true;

var stressTest;
var pixiLogo;

function onReady()
{
	stressTest = new PIXI.StressTest(onStressTestComplete);
	$(loaderView).fadeIn();
	
	loadInterval = setInterval(function(){
		
		loadCount++;
		loadCount %=4;
		
		if(loadCount == 0)
		{
			loaderText.src = "img/loading_01.png"
		}
		else if(loadCount == 1)
		{
			loaderText.src = "img/loading_02.png"
		}
		else if(loadCount == 2)
		{
			loaderText.src = "img/loading_03.png"
		}
		else if(loadCount == 3)
		{
			loaderText.src = "img/loading_04.png"
		}
		//console.log("!!!")
	}, 100);
	
	resize();
}

function onStressTestComplete()
{
	GAME.lowMode = stressTest.result < 40;
	
	interactive = false;
	holder = document.getElementById("holder");
	holder.style.display = "none";
	document.body.scroll = "no"; 
	// TODO LOADING IMAGE AT START BREAKS!
	loader = new PIXI.AssetLoader([  "img/stretched_hyper_tile.jpg", "img/SplashAssets.json", "img/WorldAssets-hd.json", "img/HudAssets-hd.json", "img/PixiAssets-hd.json", "img/iP4_BGtile.jpg",  "img/blackSquare.jpg"])
	
	
	
	loader.addEventListener( 'loaded', function ( event ) {
		
		
		$(loaderView).fadeOut('slow', function(){init(); holder.style.display="block"; clearInterval(loadInterval)});
		
	} );
	
	loader.load();
//	$(loaderView).fadeIn()
	resize();
}

function onTap()
{
	if(!interactive)return;
	
	if(gameMode == GAME_MODE.INTRO)
	{
		interactive = false;
		gameMode =  GAME_MODE.TITLE;
		logo.alpha = 0;
		logo.scale.x = 1.5;
		logo.scale.y = 1.5;
		logo.setTexture(PIXI.Texture.fromFrameId("runLogo.png"));
		TweenLite.to(logo, 0.1, {alpha:1});
		TweenLite.to(logo.scale, 1, {x:1, y:1, ease:Elastic.easeOut, onComplete:onIntroFaded2});
		
	}
	else if(gameMode == GAME_MODE.TITLE)
	{
		interactive = false;
		game.start();
		gameMode = GAME_MODE.COUNT_DOWN;
		if(black)TweenLite.to(black, 0.2, {alpha:0});
		
			TweenLite.to(logo, 0.3, {alpha:0, onComplete:function(){
			logo.visible = false;
			logo.setTexture(PIXI.Texture.fromFrameId("gameOver.png"))
			game.view.showHud();
			
			game.view.hud.removeChild(black);
			
			countdown.startCountDown(onCountdownComplete);
		}})
	}
	else if(gameMode == GAME_MODE.GAME_OVER)
	{
		interactive = false;
		game.view.stage.addChild(black);
		TweenLite.to(black, 0.3, {alpha:1, onComplete:function(){
			
			// update the floor!
			game.steve.position.x = 0;
			GAME.camera.x = game.steve.position.x - 100;
			game.reset();
			logo.visible = false;
			gameMode = GAME_MODE.COUNT_DOWN;
			
			TweenLite.to(black, 0.3, {alpha:0, onComplete:function(){
				logo.visible = false;
				game.start();
				game.view.showHud();
				game.view.stage.removeChild(black);
				countdown.startCountDown(onCountdownComplete);
			
			}});
		}});
	}
	else
	{
		if(game.isPlaying)game.steve.jump();
	}
}

function onIntroFaded2()
{
	
	interactive = true;
}

function init()
{
	gameMode =  GAME_MODE.INTRO
	interactive = false;
	console.log("init ok!")
	game = new GAME.RprEngine();
	
	holder.appendChild(game.view.renderer.view);
	game.view.renderer.view.style.position = "absolute";
	//game.view.renderer.context.webkitImageSmoothingEnabled = false
	game.view.renderer.view.webkitImageSmoothingEnabled = false
	stats = new Stats();
	
	//holder.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	
	if(GAME.lowMode)
	{
		setInterval(update, 1000/30);
	}
	else
	{
		requestAnimFrame(update);
	}
	
	game.onGameover = onGameover
	$(game.view.renderer.view).mousedown(function(event){
		event.preventDefault()
		
		onTap();
	});
	
	$(game.view.renderer.view).mouseup(function(event){
		event.preventDefault();
		
		if(game.isPlaying)game.steve.fall();
	});
	
	game.view.renderer.view.addEventListener("touchstart", onTouchStart, true);
	game.view.renderer.view.addEventListener("touchend", onTouchEnd, true);
	//document.addEventListener("touchmove", onTouchMove, true);
	black = new PIXI.Sprite.fromImage("img/blackSquare.jpg");
	this.game.view.hud.addChild(black);
	TweenLite.to(black, 0.3, {alpha:0.75, delay:0.5});
	
		

	// create the logo!
	logo = PIXI.Sprite.fromFrame("infoPanel.png");
	this.game.view.hud.addChild(logo);
	logo.anchor.x = 0.5;
	logo.anchor.y = 0.5;
	logo.alpha = 0;
	
	logo.scale.x = 1.5;
	logo.scale.y = 1.5;
	
	var pressStart = PIXI.Sprite.fromFrame("spaceStart.png");
	pressStart.anchor.x = 0.5;
	pressStart.position.y = 200;
	
	// ALPHA ISSUE>>>
//	logo.addChild(pressStart);

	
	TweenLite.to(logo, 0.1, {alpha:1, delay:0.6});
	TweenLite.to(logo.scale, 1, {x:1, y:1, ease:Elastic.easeOut, delay:0.6, onComplete:onIntroFaded});
	
	countdown = new GAME.Countdown();
	this.game.view.hud.addChild(countdown);
	
	
	pixiLogo = PIXI.Sprite.fromFrame("pixijsLogo.png")
		this.game.view.stage.addChild(pixiLogo);
	resize();
	
}

function onIntroFaded()
{
	interactive = true;
}

function onGameover()
{
	gameMode = GAME_MODE.GAME_OVER
	interactive = false;
}

function showGameover()
{
	//if(gameMode != GAME_MODE.GAME_OVER)return;
//	interactive = false;
	logo.visible = true;
	TweenLite.to(logo, 0.3, {alpha:1, onComplete:onGameoverShown})
}

function onGameoverShown()
{
	interactive = true;
}

function onTouchStart(event)
{
	event.preventDefault();
	onTap();
}

function onCountdownComplete()
{
	interactive = true;
	gameMode = GAME_MODE.PLAYING;
	
}

function onTouchEnd(event)
{
	event.preventDefault();
	if(game.isPlaying)game.steve.fall();
}


function resize()
{
	var width = $(window).width(); 
	var height = $(window).height(); 
	
	var ratio = height / 640;
	
//	console.log(width + " : " + height + " ratio:" + ratio)
	//ratio = Math.min(ratioX, ratioY);
	//offsetX = width/2 - (600 * ratio)/2;
	//offsetY = height/2 - (800 * ratio)/2;
	
	if(game)
	{
		var view = game.view.renderer.view;
		//view.style.width = 600 * ratio +"px"
		view.style.height = 640 * ratio +"px"
		

		//holder.style.left = width/2 - (600 * ratio)/2 + "px";//(width / 2) - (600 * ratio) + "px"; 
		//holder.style.top =  height/2 - (800 * ratio)/2 + "px";
		var newWidth = (width /ratio);
		
		view.style.width =width +"px"
		
		this.logo.position.x = newWidth / 2;
		this.logo.position.y = 640/2 - 20;
		
		if(black)
		{
			black.scale.x = newWidth/16; 
			black.scale.y = 640/16;
		}

		this.countdown.position.x = newWidth / 2;
		this.countdown.position.y = 640/2;
		
		console.log(newWidth)
		
		game.view.resize(newWidth , 640);
		
		pixiLogo.position.x = newWidth - 118;
		pixiLogo.position.y = 640 - 60 -10
	}
	
	GAME.width = (width /ratio);
	GAME.height = 640;
	loaderView.style.left = width/2 - 256/2 + "px";
	loaderView.style.top = height/2 - 82/2+ "px";
	//renderer.resize(width, height);
}

function update()
{
	//stats.begin();
	game.update();
	if(!GAME.lowMode)
	{
		requestAnimFrame(update);
	}

//	stats.end();
	
}

/*
 *  little time class!
 */
Time = function()
{
	this.deltaTime = 1;	
	this.lastTime = 0;
}

Time.constructor = Time;

Time.prototype.update = function()
{
	var time = Date.now();
	var currentTime =  time;
	var passedTime = currentTime - this.lastTime;
	
	if(passedTime > 100)passedTime = 100;
	
	///this.DELTA_TIME = passedTime ;
	
//			1 = 17  // 60??
	this.DELTA_TIME = (passedTime * 0.06);
	//console.log(this.DELTA_TIME);
//		trace(DELTA_TIME);
	// 60 ---> 1
	// 30 ---> 2
	this.lastTime = currentTime;
}

// create an instance!

