
BasicGame.MainMenu = function (game) {

	//this.music = null;
	this.playButton = null;
	this.reloadButton = null;
	this.nextButton = null;


};

BasicGame.MainMenu.prototype = {

	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();
		//this.add.sprite(0, 0, 'titlepage');
		this.world.setBounds(0 ,0, 1024, 500);
		this.playButton = this.add.button(340, 50, 'playButton', this.startGame, this);
		this.reloadButton = this.add.button(340, 50, 'reloadButton', this.reloadGame, this);
		this.nextButton = this.add.button(340, 50, 'nextButton', this.nextGame, this);
		this.playButton.visible = false;
		this.reloadButton.visible = false;
		this.nextButton.visible = false; 



	},

	update: function () {

		this.Swing();

		if (BasicGame.lifes < 0) {
			this.reloadButton.kill();
			this.nextButton.kill();
		}

	},

	Swing: function() {
        if (BasicGame.started == true)
        {
        	this.playButton.visible = true;
        } 
        else if (BasicGame.started == false) 
        {
        	if (BasicGame.newLevel == false) {
	        	this.playButton.visible = false;
				this.reloadButton.visible = true;
	        	this.playButton = this.add.button(340, 200, 'playButton', this.startGame, this);
	        } 
	        else if (BasicGame.newLevel == true) {
	        	this.playButton.visible = false;
				this.nextButton.visible = true;
	        	this.playButton = this.add.button(340, 200, 'playButton', this.startGame, this);
	        }
        }
 
    },

	startGame: function (pointer) {
		BasicGame.started = false;
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		BasicGame.newGame = true;
		BasicGame.lifes = 3;
		BasicGame.worldHeight = 3000;
        BasicGame.meter = 6;  
        BasicGame.high = 550;
        BasicGame.birdCount = 3;
        BasicGame.starCount = 4;
        BasicGame.level = 1;
        BasicGame.score = 0;
        BasicGame.playerGravity = 250;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true;  
		//	And start the actual game
		this.state.start('Game');

	},

	reloadGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		BasicGame.started = false;
		BasicGame.newGame = false;
		BasicGame.lifes = BasicGame.lifes;
		BasicGame.level = BasicGame.level;
        BasicGame.score = BasicGame.score;
		BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true; 
        BasicGame.worldHeight = BasicGame.worldHeight;
        BasicGame.meter = BasicGame.meter;  
        BasicGame.high = BasicGame.high;
		//	And start the actual game
		this.state.start('Game');

	},

	nextGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		BasicGame.newGame = false;
		BasicGame.lifes = BasicGame.lifes;
		BasicGame.level = BasicGame.level;
        BasicGame.score = BasicGame.score;
        console.log(BasicGame.level);
		BasicGame.worldHeight = 4000;
        BasicGame.meter = 8;     
        BasicGame.high = 550;

        BasicGame.birdCount = 5;
        BasicGame.starCount = 5;

        
        BasicGame.playerGravity = 270;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true;  

		//	And start the actual game
		this.state.start('Game');

	},


};