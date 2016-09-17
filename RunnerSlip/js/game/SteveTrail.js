

GAME.SteveTrail = function()
{
	this.target = new PIXI.Point();
	var points = [];
	for (var i=0; i < 5; i++) {
	  points.push(new PIXI.Point(i * 669/5, i * 5));
	};
	this.count = Math.random() * 100;
	this.speed =1 + Math.random() * 2;
	
	this.blendMode = PIXI.blendModes.SCREEN
	PIXI.Rope.call( this, PIXI.Texture.fromImage("img/trail.jpeg"), points);
}

// constructor
GAME.SteveTrail.constructor = GAME.SteveTrail;
GAME.SteveTrail.prototype = Object.create( PIXI.Rope.prototype );

GAME.SteveTrail.prototype.updateTransform = function()
{
	PIXI.Rope.prototype.updateTransform.call(this);
	
	this.count += this.speed;
	var points = this.points;
	
	for (var i=0; i < points.length; i++) {
		var point = points[i];
		point.y += (this.target.y - point.y) * i / 5;
		point.x = i * -10;
	}
	
}
