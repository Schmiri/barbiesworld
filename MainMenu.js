
BasicGame.MainMenu = function (game) {

	//this.music = null;
	this.playButton = null;
	this.reloadButton = null;
	this.nextButton = null;
	this.tutorialButton = null;


};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.world.setBounds(0 ,0, 1024, 500);

		// Some clouds in the background
        clouds = this.add.group();
        this.physics.arcade.enable(clouds);
        clouds.enableBody = true;

		for (var i = 0; i < 300; i++)
        {
            //  Create a cloud inside of the 'clouds' group
            var cloud = clouds.create(i * Math.random()*270+100, i * Math.random()*580+630, 'cloud');
            cloud.body.velocity.y = -150;
        }
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();
		//this.add.sprite(0, 0, 'titlepage');


		this.playButton = this.add.button(320, 220, 'playButton', this.startGame, this);
		this.reloadButton = this.add.button(320, 220, 'reloadButton', this.reloadGame, this);
		this.nextButton = this.add.button(320, 220, 'nextButton', this.nextGame, this);
		this.tutorialButton = this.add.button(320, 350, 'tutorialButton', this.tutorial, this);
		this.playButton.visible = false;
		this.reloadButton.visible = false;
		this.nextButton.visible = false; 
		this.tutorialButton.visible = false;

		this.createText();

	},

	createText: function () {
		
        this.headline = this.add.text(420,50, 'Fly high');

		this.headline.font = 'Loved by the King';
        this.headline.fontSize = 90;
        this.headline.padding.set(250, 16);

        console.log("level: " + BasicGame.level);
        console.log("Sterne: " + BasicGame.score);
        console.log("Leben: " + BasicGame.lifes);

     },

	update: function () {

		this.Swing();

		if (BasicGame.lifes < 0) {
			this.playButton.visible = false;
			this.reloadButton.kill();
			this.nextButton.kill();
			this.playButton = this.add.button(320, 190, 'playButton', this.startGame, this);
			this.tutorialButton = this.add.button(320, 350, 'tutorialButton', this.tutorial, this);

		}

	},

	Swing: function() {
        if (BasicGame.started == true)
        {
        	this.playButton.visible = true;
        	this.tutorialButton.visible = true;
        } 
        else if (BasicGame.started == false) 
        {
        	if (BasicGame.newLevel == false) {
	        	this.playButton.visible = false;
	        	this.tutorialButton.visible = false;
	        	this.reloadButton.visible = true;
	        	this.playButton = this.add.button(320, 350, 'playButton', this.startGame, this);
	        } 
	        else if (BasicGame.newLevel == true) {
	        	this.playButton.visible = false;
	        	this.tutorialButton.visible = false;
				this.nextButton.visible = true;
	        	this.playButton = this.add.button(320, 350, 'playButton', this.startGame, this);
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
        BasicGame.birdGravity = 200;
        BasicGame.cloudCount = 20;
        BasicGame.level = 1;
        BasicGame.score = 0;
        BasicGame.playerGravity = 240;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true;
        BasicGame.hightext;
		//	And start the actual game
		this.state.start('Game', null, true);
		this.headline.visible = false;
		clouds.visible = false;
		this.playButton.visible = false;
		this.reloadButton.visible = false;
		this.nextButton.visible = false; 
		this.tutorialButton.visible = false;

	},

	reloadGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		BasicGame.started = false;
		BasicGame.newGame = false;
        BasicGame.high = 550;
		BasicGame.lifes = BasicGame.lifes;
		BasicGame.level = BasicGame.level;
        BasicGame.score = BasicGame.score;
        BasicGame.birdGravity = BasicGame.birdGravity;
        BasicGame.cloudCount = BasicGame.cloudCount;
		BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera = true;
        BasicGame.playerAlive = true; 
        BasicGame.worldHeight = BasicGame.worldHeight;
        BasicGame.meter = BasicGame.meter;  
        BasicGame.high = BasicGame.high;
        BasicGame.highText = BasicGame.highText;
         //	And start the actual game
		this.state.start('Game');

	},

	tutorial: function (pointer) {
		BasicGame.started = true;
        BasicGame.newLevel = false;
		BasicGame.worldHeight = 2400;
        BasicGame.meter = 5;  
        BasicGame.high = 550;
        BasicGame.birdCount = 1;
        BasicGame.starCount = 3;
        BasicGame.birdGravity = 150;
        BasicGame.cloudCount = 20;
        BasicGame.playerGravity = 20;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true;
        BasicGame.hightext;
        BasicGame.tutorialText;
         //	And start the Tutorial
		this.state.start('Tutorial');
	},

	nextGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();
		BasicGame.newGame = false;
		BasicGame.lifes = BasicGame.lifes;
		BasicGame.level = BasicGame.level;
        BasicGame.score = BasicGame.score;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        BasicGame.playerAlive = true;   
        BasicGame.hightext = BasicGame.hightext; 

        console.log(BasicGame.counter);
        if (BasicGame.newLevel == true) {
        	BasicGame.counter++;
        	console.log(BasicGame.counter);
        }

        if (BasicGame.counter == 2) {
			BasicGame.worldHeight = 4000;
	        BasicGame.meter = 8;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 5;
	        BasicGame.starCount = 5;
	        BasicGame.birdGravity = 220;
			BasicGame.playerGravity = 247;  
			BasicGame.cloudCount = 30;
		}

		if (BasicGame.counter == 3) {
			BasicGame.worldHeight = 5000;
	        BasicGame.meter = 10;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 7;
	        BasicGame.starCount = 6;
	        BasicGame.birdGravity = 240;
			BasicGame.playerGravity = 254; 
			BasicGame.cloudCount = 40;
		}

		if (BasicGame.counter == 4) {
			BasicGame.worldHeight = 6000;
	        BasicGame.meter = 12;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 9;
	        BasicGame.starCount = 7;
	        BasicGame.birdGravity = 260;
			BasicGame.playerGravity = 261; 
			BasicGame.cloudCount = 50;
		}

		if (BasicGame.counter == 5) {
			BasicGame.worldHeight = 7000;
	        BasicGame.meter = 14;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 11;
	        BasicGame.starCount = 8;
	        BasicGame.birdGravity = 280;
			BasicGame.playerGravity = 268;
			BasicGame.cloudCount = 60;
		}

		if (BasicGame.counter == 6) {
			BasicGame.worldHeight = 8000;
	        BasicGame.meter = 16;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 13;
	        BasicGame.starCount = 9;
	        BasicGame.birdGravity = 300;
			BasicGame.playerGravity = 275;
			BasicGame.cloudCount = 70;
		}

		if (BasicGame.counter == 7) {
			BasicGame.worldHeight = 9000;
	        BasicGame.meter = 18;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 15;
	        BasicGame.starCount = 10;
	        BasicGame.birdGravity = 320;
			BasicGame.playerGravity = 282;
			BasicGame.cloudCount = 80;
		}

		if (BasicGame.counter >7) {
			BasicGame.worldHeight = 10000;
	        BasicGame.meter = 20;     
	        BasicGame.high = 550;
	        BasicGame.birdCount = 17;
	        BasicGame.starCount = 11;
	        BasicGame.birdGravity = 340;
			BasicGame.playerGravity = 289;
			BasicGame.cloudCount = 90;
		}
        
		
		//	And start the actual game
		this.state.start('Game', null, true);
		this.headline.visible = false;
		clouds.visible = false;
		this.playButton.visible = false;
		this.reloadButton.visible = false;
		this.nextButton.visible = false; 
		this.tutorialButton.visible = false;

	},


};