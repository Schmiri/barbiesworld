
/*var GameState = {
	preload: function() {
		load.image('ground', 'assets/ground.png');
	},


	create: function() {
		game.add.sprite(0, 0, 'ground');
	},

	update: function() {

	},
};*/
var game = new Phaser.Game(1024, 1200, Phaser.AUTO);

var GameState = {
	preload: function() {
	    this.load.image('ground', 'assets/ground.png');
	    this.load.image('player', 'assets/playerJump.png');
	    this.load.image('bird', 'assets/bird.png');
	    this.load.image('heli', 'assets/helicopter.png');
	},

	create: function() {
		game.stage.backgroundColor = '#9EDEF2';
		this.background = this.game.add.sprite(0, 903, 'ground');
		this.background.anchor.setTo(0.5, 0.0);
		this.background.scale.setTo(3,1);
		//this.heli = this.game.add.sprite(this.game.world.centerX, 0, 'heli');
		this.heli = this.game.add.sprite(1350, 0, 'heli');
		this.heli.anchor.setTo(0.5, 0.0);
		this.player = this.game.add.sprite(1305, 58, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.bird = game.add.sprite(20, 120, 'bird');
		this.bird.anchor.setTo(0.5, 0.5);
		this.bird.scale.setTo(0.5,0.5);
		game.physics.enable(bird, Phaser.Physics.ARCADE);
		
		/*this.heli.animations.add('run');
    	this.heli.animations.play('run', 100, true);
    	this.player.animations.add('run');
    	this.player.animations.play('run', 100, true);
    	this.bird.animations.add('run');
    	this.bird.animations.play('run', 100, true);*/
	},

	update: function() {
		/*if (this.bird.x < this.game.world.centerX) {
    		this.bird.x += 2;
    	};
    	if (this.bird.x == this.game.world.centerX) {
    		this.bird.anchor.setTo(-0.5, 0.5);
    		this.bird.x -= 2;
    	};*/
    	if (this.heli.x > this.game.world.centerX) {
				this.heli.x -= 4;
				this.player.x -= 4;
				
		};
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.player.y -= 10;
				if (this.player.y == 0) {
				this.player.y += 4;
		}
		};
		
		
		//var birdFly = this.bird.x + 20;

		if (this.bird.x < this.game.world.centerX-200) {
				this.bird.x += 2;
		};
		this.bird.scale.setTo(-0.5,0.5);
		
	}
};


game.state.add('GameState', GameState);
game.state.start('GameState');