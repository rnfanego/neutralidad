var Main = function(game){

};

Main.prototype = {

	create: function() {
		this.game.world.setBounds(0,0,1920,600);

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

	loadLevel: function(){
		this.platforms = game.add.physicsGroup();

		this.platforms.create(0,500,'platform');
		this.platforms.create(500,400,'platform_small');
		this.platforms.create(800,200,'platform_medium');
		this.platforms.create(300,300,'platform_small');

		this.platforms.setAll('body.immovable',true);
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
	}
};