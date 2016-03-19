var Main = function(game){

};

Main.prototype = {

	create: function() {
		this.initializeVariables();
		this.loadLevel();
		this.loadEnemies();
		this.loadPlayer();
		this.spawnPlayer();
		this.loadInput();
	},

	update: function() {
		this.game.physics.arcade.collide(this.player,this.platforms);
		this.game.physics.arcade.collide(this.enemy,this.platforms);
		this.game.physics.arcade.overlap(this.player,this.enemy,this.spawnPlayer,null,this);

		this.player.body.velocity.x = 0;

		this.checkInputs();
	},

	gameOver: function(){
		this.game.state.start('GameOver');
	},

	initializeVariables:function(){
		this.neutralColor = "#7F7F7F";
		this.evilColor = "#000000";
		this.goodColor = "#FFFFFF";
	},

	loadLevel: function(){
		this.game.world.setBounds(0,0,1920,600);
		//load platforms and obstacles
		this.platforms = game.add.physicsGroup();

		this.platforms.create(0,500,'platform');
		this.platforms.create(500,400,'platform_small');
		this.platforms.create(800,200,'platform_medium');
		this.platforms.create(300,300,'platform_small');

		this.platforms.setAll('body.immovable',true);

		//load good, evil and neutral zones
		this.createZone(this.neutralColor,300,200,150,400);
	},

	loadEnemies: function(){
		this.enemy = this.game.add.sprite(850,150,'enemy');
		this.game.physics.arcade.enable(this.enemy);
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.gravity.y = 500;
	},

	loadPlayer: function(){
		this.player = this.game.add.sprite(100,200,'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.gravity.y = 500;
		this.game.camera.follow(this.player);
	},

	loadInput: function(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	},

	spawnPlayer: function(){
		this.player.scale.setTo(0, 0);
		this.game.add.tween(this.player.scale).to({x:1, y:1}, 300).start();
		this.player.reset(100,200);
	},

	checkInputs: function(){
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -250;
		}else if(this.cursors.right.isDown){
			this.player.body.velocity.x = 250;
		}

		if(this.jumpButton.isDown && (this.player.body.onFloor() || this.player.body.touching.down)){
			this.player.body.velocity.y = -400
		}
	},

	createZone: function(color,width,height,x,y){
		var bmd = this.game.add.bitmapData(width, height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, 200);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();
		drawnObject = this.game.add.sprite(x, y, bmd);
		drawnObject.anchor.setTo(0.5, 0.5);
	}
};