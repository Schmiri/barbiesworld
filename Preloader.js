BasicGame.Preloader = function (game) {
    this.ready = false;
};

BasicGame.Preloader.prototype = {

    preload: function () {

        //  These are the assets we loaded in Boot.js
        this.stage.backgroundColor = '#9EDEF2';
     
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
        this.load.audio('titleMusic', ['assets/main_menu.mp3']);
    },


    create: function () {
    },

    update: function () {
        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        {
            this.ready = true;
            this.state.start('MainMenu');
        }

    }
};