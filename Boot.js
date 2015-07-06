var BasicGame = {};

BasicGame.Boot = function (game) {

        var player; 
        var heli;
        var clouds;
        var birds;
        var stars;  
        var cursors;
        var started;

        var high;
        var worldHeight;
        var meter;        
        var birdCount;
        var starCount;
        var cloudCount;
        var lifes;
        var level;
        var score;
        var fallschirmOffen; 
        var worldHeight;
        var moveCamera;
        var playerAlive;  
        var playerGravity;
        var textSprite;
        var text;
        var counter;
        var highText;
        var headline;
        var birdGravity;
        var gameOver;
        var tutorialText;

};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/preloader_background.png');
        this.load.image('preloaderBar', 'assets/preloadr_bar.png');

    },

    create: function () {

        WebFontConfig = {

            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function() { this.time.events.add(Phaser.Timer.SECOND, this.createText, this); },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
              families: [ 'Loved by the King', 'Open+Sans+Condensed:300:latin'  ] 
            }
        },

        BasicGame.started = true;
        BasicGame.newLevel = false;
        BasicGame.high = 550;
        BasicGame.worldHeight = 3000;
        BasicGame.meter = 6;        
        BasicGame.birdCount = 3;
        BasicGame.starCount = 4;
        BasicGame.cloudCount = 20;
        BasicGame.birdGravity = 200;
        BasicGame.lifes = 3;
        BasicGame.level = 1;
        BasicGame.score = 0;
        BasicGame.playerGravity = 240;
        BasicGame.fallschirmOffen = false; 
        BasicGame.moveCamera=true;
        this.camera.view.x = 100;
        this.camera.view.y = 200;
        BasicGame.playerAlive = true; 
        BasicGame.counter = 1; 
        BasicGame.highText;
        BasicGame.headline;
        BasicGame.gameOver;
        BasicGame.tutorialText;


        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};