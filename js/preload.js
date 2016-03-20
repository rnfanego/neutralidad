var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.stage.backgroundColor= '#3FB3DC';
		this.game.load.image('player','assets/player.png');
		this.game.load.image('enemy','assets/enemy.png');
		this.game.load.image('platform','assets/platform.png');
		this.game.load.image('platform_medium','assets/platform_medium.png');
		this.game.load.image('platform_small','assets/platform_small.png');
		this.game.load.image('wall_small','assets/wall_small.png');
		this.game.load.image('wall_medium','assets/wall_medium.png');
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}