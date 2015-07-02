BasicGame.Preloader = function (game) {

    //this.ready = false;



};

BasicGame.Preloader.prototype = {

    preload: function () {

        //  These are the assets we loaded in Boot.js
        //  A nice sparkly background and a loading progress bar
        this.stage.backgroundColor = '#9EDEF2';
     
        //  This sets the preloadBar sprite as a loader sprite.
        //  What that does is automatically crop the sprite from 0 to full-width
        //  as the files below are loaded in.

        //  Here we load the rest of the assets our game needs.
        //  As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('dude', 'assets/player.png', 275, 315, 4);
        this.load.image('heli', 'assets/helicopter.png');
        this.load.spritesheet('bird', 'assets/bird.png', 72, 51, 4)
        this.load.image('star', 'assets/star.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('playButton', 'assets/play_button.png');
        this.load.image('reloadButton', 'assets/reload_button.png');
        this.load.image('nextButton', 'assets/next_button.png');
        this.load.image('tutorialButton', 'assets/tutorial_button.png');


        //this.load.audio('titleMusic', ['audio/main_menu.mp3']);

    },


    create: function () {

        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
          

    },

    update: function () {

        //  You don't actually need to do this, but I find it gives a much smoother game experience.
        //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //  You can jump right into the menu if you want and still play the music, but you'll have a few
        //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //  it's best to wait for it to decode here first, then carry on.
        
        //  If you don't have any music in your game then put the game.state.start line into the create function and delete
        //  the update function completely.
        
        /*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        {
            this.ready = true;*/
            this.state.start('MainMenu');
        //}

    }

};