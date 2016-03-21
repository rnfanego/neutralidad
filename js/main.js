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

		this.player.forEach(function(item){
			item.body.velocity.x = 0;
		});

		this.checkInputs();
	},

	render: function(){
		// Input debug info
    	//game.debug.inputInfo(32, 32);
    	//game.debug.pointer( game.input.activePointer );
	},

	gameOver: function(){
		this.game.state.start('GameOver');
	},

	initializeVariables:function(){
		this.neutralColor = "#7F7F7F";
		this.evilColor = "#000000";
		this.goodColor = "#FFFFFF";
		this.zones = game.add.group();
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
		this.createZone(this.evilColor,800,300,400,150);
		this.createZone(this.goodColor,500,200,550,400);
	},

	loadEnemies: function(){
		this.enemy = this.game.add.sprite(850,150,'enemy');
		this.game.physics.arcade.enable(this.enemy);
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.gravity.y = 500;
	},

	loadPlayer: function(){
		this.player = game.add.group();
		this.player.enableBody = true;
		this.player.physicsBodyType = Phaser.Physics.ARCADE;
		//this.player = this.game.add.sprite(100,200,'player');
		var container = this.player.create(100,200,'player');
		var goodPart = this.player.create(135,205,'good_part_player');
		var evilPart = this.player.create(120,205,'evil_part_player');
		//this.game.physics.arcade.enable(this.player);
		container.body.collideWorldBounds = true;
		container.body.gravity.y = 500;
		evilPart.body.collideWorldBounds = false;
		evilPart.body.gravity.y = 500;
		goodPart.body.collideWorldBounds = false;
		goodPart.body.gravity.y = 500;
		this.game.camera.follow(container);
	},

	loadInput: function(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	},

	spawnPlayer: function(){
		this.player.forEach(function(item){
			item.scale.setTo(0, 0);
			this.game.add.tween(item.scale).to({x:1, y:1}, 300).start();
			item.reset(100,300);
		});
	},

	checkInputs: function(){
		if(this.cursors.left.isDown){
			this.player.forEach(function(item){
				item.body.velocity.x = -250;
			});
		}else if(this.cursors.right.isDown){
			this.player.forEach(function(item){
				item.body.velocity.x = 250;
			});
		}

		if(this.jumpButton.isDown && (this.player.body.onFloor() || this.player.body.touching.down)){
			this.player.forEach(function(item){
				item.body.velocity.y = -400;
			});
		}
	},

	createZone: function(color,width,height,x,y){
		var bmd = this.game.add.bitmapData(width, height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();
		drawnObject = this.zones.create(x, y, bmd);
		drawnObject.anchor.setTo(0.5, 0.5);
	}
};