BasicGame.Tutorial = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)




};

BasicGame.Tutorial.prototype = {

    create: function () {

        

        this.world.setBounds(0 ,0, 1024, BasicGame.worldHeight);

        //set background and ground
        this.stage.backgroundColor = '#9EDEF2';

        // Some clouds in the background
        clouds = this.add.group();

        //  Here we'll create some clouds
        for (var i = 0; i < BasicGame.cloudCount; i++)
        {
            //  Create a cloud inside of the 'clouds' group
            var cloud = clouds.create(i * Math.random()*170+100, i * Math.random()*480+600, 'cloud');
        }

        //  Some stars to collect
        stars = this.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < BasicGame.starCount; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * Math.random()*1400+500, i * Math.random()*1200+1300, 'star');
        }
        
        ground = this.add.sprite(0, this.world.height-150, 'ground');
        ground.scale.setTo(1.3,1); //doppelt so breit

        //set heli außerhalb vom spielfeld (rechts)
        heli = this.add.sprite(this.world.width+300, 60, 'heli');

        // The player and its settings
        player = this.add.sprite(this.world.width+390, 0, 'dude');
        player.enableBody = true;
        
        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //player sprite wird verschoben
        player.animations.add('left', [1], 4, true);
        player.animations.add('right', [1], 4, true);
        player.animations.add('down', [2], 4, true);
        player.animations.add('dead', [3], 4, true);
        player.animations.add('up', [0], 4, true);

        // Levels, Stars and Lifes, high in meter as well
        this.createText();

        //  some birds to collide
        birds = this.add.group();
        this.physics.arcade.enable(birds);
        birds.enableBody = true;

        for (var i = 0; i < BasicGame.birdCount; i++)
        {
            //  Create the birds
            var bird = birds.create(i * Math.random() *700 + 700, i * Math.random() *700 + 800, 'bird', 0);
            bird.birdDirection = 1;
        }
        birds.callAll('animations.add', 'animations', 'right', [0, 1], 4, true);
        birds.callAll('animations.add', 'animations', 'left', [2, 3], 4, true);
        
        //  And play them
        birds.callAll('animations.play', 'animations', 'right');
        
        this.camera.follow(player);

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();


    },

    createText: function () {

        BasicGame.text = this.add.text(15,20, 'Tutorial');

        BasicGame.text.font = 'Loved by the King';
        BasicGame.text.fontSize = 30;
        BasicGame.text.padding.set(10, 16);
        BasicGame.text.fixedToCamera = true;
        
         for (var i = 1; i < BasicGame.meter; i++)
        {
            BasicGame.highText = this.add.text(920, this.world.height-BasicGame.high, '_' + 8*i + 'm');
            BasicGame.high += 500;
            BasicGame.highText.font = 'Loved by the King';
            BasicGame.highText.fontSize = 50;
            BasicGame.highText.padding.set(10, 16);
         }

        BasicGame.tutorialText = this.add.text(50,350, ' ');;
        BasicGame.tutorialText.font = 'Open Sans Condensed';
        BasicGame.tutorialText.fontSize = 23;
        BasicGame.tutorialText.padding.set(2, 2);
        BasicGame.tutorialText.fixedToCamera = true;


    },

    update: function () {

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        // Bounding-Box settings
        player.body.setSize(65, 150, 137, 161);

        if (!player.animations._anims.dead.isPlaying) {
            player.animations.play('up');
        }

        //bei start kommt heli mit dude reingeflogen    
        if (heli.x > this.world.centerX-270) 
        {
            //geschwindigkeit und position     
            heli.x -= 4;
            player.x -= 4;
        }

        //  birds mit welt colidieren
        birds.forEachAlive(function (bird) {
            if (bird.body.x >= 1024-72) {
                bird.birdDirection = -1;
                bird.animations.play('left');
            } else if (bird.body.x <= 0) {
                bird.birdDirection = 1; 
                bird.animations.play('right');
            } 
            bird.body.velocity.x = BasicGame.birdGravity * bird.birdDirection;
        });
        
        //Player springt los, erst wenn der heli angekommen ist
        if (heli.x<=this.world.centerX-200) {
                BasicGame.tutorialText.text = 'Drücke die Down-Taste, \num aus dem Helicopter zu springen';
        }

        if (player.body.y >= this.world.height-2210) {
            BasicGame.tutorialText.text = '';
        }

        if (player.body.y >= this.world.height-2100) {
            BasicGame.tutorialText.text = 'Drücke die Pfeil-Tasten nach links oder rechts, \num Vögeln auszuweichen';
        }

         if (player.body.y >= this.world.height-1650) {
            BasicGame.tutorialText.text = '';
        }

        if (cursors.down.isDown && heli.x<=this.world.centerX-200 && BasicGame.playerAlive == true)
        { 
            //  Player physics properties. Give the little guy a slight bounce.
            if (BasicGame.fallschirmOffen == true) {
                player.body.bounce.y = 0.1;  
            }

            player.body.gravity.y = BasicGame.playerGravity;
            player.body.collideWorldBounds = true;
        }

        //cursor bewegen, wenn er gefallen ist
        if (cursors.left.isDown && player.body.gravity.y == BasicGame.playerGravity && BasicGame.playerAlive == true)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (cursors.right.isDown && player.body.gravity.y == BasicGame.playerGravity && BasicGame.playerAlive == true)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');
        }

        if (player.body.y >= this.world.height-1650) {
            BasicGame.tutorialText.text = 'Sammle Sterne um neue Leben zu erhalten. \nDrei Sterne bringen dir ein neues Leben';
        }

         if (player.body.y >= this.world.height-840) {
            BasicGame.tutorialText.text = '';
        }

        // Fallschirm oeffnen sobald Ground sichtbar ist
        if (player.body.y >= this.world.height-790) {
            BasicGame.tutorialText.text = 'Drücke die Up-Taste, \num sicher mit dem Fallschirm zu landen';
        }

         if (player.body.y >= this.world.height-400) {
            BasicGame.tutorialText.text = '';
        }

        if (cursors.up.isDown && player.body.y >= this.world.height-600 && BasicGame.playerAlive == true)
        {
            player.body.velocity.y = 180;
            player.animations.play('down');
            BasicGame.fallschirmOffen = true; 
        } 
        else if (BasicGame.fallschirmOffen == false && player.body.y >= this.world.height-150) {
            this.collideGround(player);
        }

        if (BasicGame.fallschirmOffen == true && BasicGame.playerAlive == true)
        {
            player.animations.play('down');
            BasicGame.newLevel = true;
            this.time.events.add(3000, this.quitGame, this);
        } 

        if (this.camera.view.y<BasicGame.worldHeight-600 && BasicGame.moveCamera==true)
        {
            this.camera.view.x = 100;
            this.camera.view.y = 200;
            this.camera.bounds.y=player.y;
        } else {
            this.moveCamera=false;
            this.camera.view.y=BasicGame.worldHeight-600;
        }
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        this.physics.arcade.overlap(player, birds, this.collideBird, null, this);
    },

    collectStar: function (player, star) 
    {
        // Removes the star from the screen
        star.kill();
    },

    collideBird: function (player, bird) 
    {
        BasicGame.playerAlive = false;
        birds.forEachAlive(function (b) {
            b.kill();
        });
        stars.forEachAlive(function (s) {
            s.kill();
        });
        player.animations.play('dead');
        BasicGame.newLevel = false;
        this.time.events.add(1000, this.quitGame, this);
    },

    collideGround: function (player, ground) 
    {
        BasicGame.playerAlive = false;
        player.animations.play('dead');
        BasicGame.newLevel = false;
        this.time.events.add(1500, this.quitGame, this);
    },

    quitGame: function () {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
