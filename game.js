


function playGame() {

    var game = new Phaser.Game(1024, 630, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    //  The Google WebFont Loader will look for this object, so create it before loading the script.
    WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: [ 'Amatic+SC::latin' ]
        }

    };
    function preload() 
    {
        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('dude', 'assets/player3.png', 275, 315, 4);
        game.load.image('heli', 'assets/helicopter.png');
        game.load.spritesheet('bird', 'assets/birdi.png', 72, 51, 4)
        game.load.image('star', 'assets/star.png');
        game.load.image('cloud', 'assets/cloud.png');
    }

    // anzahl der Weltgroesse/ Sprunghöhe (erhoeht sich im level)
    var worldHeight = 3000;
    var player; 
    // Fallgeschwindigkeit des Players (erhoeht sich im level)
    var playerGravity = 250;
    var fallschirmOffen = false; 
    var heli;
    var clouds;
    var birds;
    var reverseEnemyTriggers
    // anzahl der voegel (erhoeht sich im level)
    var birdCount = 3;
    var stars;
    // anzahl der sterne (erhoeht sich im level)
    var starCount = 4;

    var textSprite;
    var level = 1;
    var levelText;
    var cursors;
    var score = 0;
    var scoreText;
    var lifes = 3;
    var lifesText;
    var moveCamera=true;

    var high = 550;
    var meter = 8;
    var text = null;
    var grd;

    function create() 
    {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0 ,0, 1024, worldHeight);
        
        //set background and ground
        game.stage.backgroundColor = '#9EDEF2';

        // Some clouds in the background
        clouds = game.add.group();

        //  Here we'll create some clouds
        for (var i = 0; i < 15; i++)
        {
            //  Create a cloud inside of the 'clouds' group
            var cloud = clouds.create(i * Math.random()*550+100, i * Math.random()*880+600, 'cloud');
        }

        //  Some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < starCount; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * Math.random()*500+100, i * Math.random()*700+700, 'star');
        }
        
        ground = game.add.sprite(0, game.world.height-150, 'ground');
        ground.scale.setTo(1.3,1); //doppelt so breit

        //set heli außerhalb vom spielfeld (rechts)
        heli = game.add.sprite(game.world.width+300, 60, 'heli');

        // The player and its settings
        player = game.add.sprite(game.world.width+390, 0, 'dude');

        //player sprite wird verschoben
        player.animations.add('left', [1], 4, true);
        player.animations.add('right', [1], 4, true);
        player.animations.add('down', [2], 4, true);
        player.animations.add('dead', [3], 4, true);
        player.animations.add('up', [0], 4, true);

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  some birds to collide
        birds = game.add.group();
        game.physics.arcade.enable(birds);
        birds.enableBody = true;
        birds.physicsBodyType = Phaser.Physics.ARCADE;


        for (var i = 0; i < birdCount; i++)
        {
            //  Create the birds
            var bird = birds.create(0, i * Math.random() *600 + 600, 'bird', 0);
            bird.body.velocity.x = 50;
        }
        birds.callAll('animations.add', 'animations', 'right', [0, 1], 4, true);
        birds.callAll('animations.add', 'animations', 'left', [2, 3], 4, true);
 
        
        //  And play them
        birds.callAll('animations.play', 'animations', 'right');
        

        game.camera.follow(player);

        var style = { font: "55px", fill: "#0C96CD"};
        //  The score
    // ToDo: der Score ist momentan noch fest prositioniert - soll aber dem Player folgen
        

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

    }
    function createText() {
        text = game.add.text(0,0, 'Level: ' + level + '       Sterne: ' + score + '       Leben: ' + lifes);

        text.font = 'Amatic SC';
        text.fontSize = 30;

        textSprite = game.add.sprite(15, 20, null);
        textSprite.addChild(text);

        game.physics.enable(textSprite, Phaser.Physics.ARCADE);
        textSprite.body.gravity.y = 0;

         for (var i = 1; i < 6; i++)
        {
            var highText = game.add.text(950, game.world.height-high, ' ' + meter*i + ' m');
            high += 500;
            highText.font = 'Amatic SC';
            highText.fontSize = 50;
         }
    }

    function update() 
    {
       //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        // Bounding-Box settings
        player.body.setSize(65, 150, 137, 161);

        player.animations.play('up');

        //bei start kommt heli mit dude reingeflogen    
        if (heli.x > game.world.centerX-270) 
        {
            //geschwindigkeit und position     
            heli.x -= 4;
            player.x -= 4;
        }
        
        //Player springt los, erst wenn der heli angekommen ist
        if (cursors.down.isDown && heli.x<=game.world.centerX-200)
        { 
            //  Player physics properties. Give the little guy a slight bounce.
            if (fallschirmOffen == true) {
                player.body.bounce.y = 0.1;
            }
            player.body.gravity.y = playerGravity;
            player.body.collideWorldBounds = true;
            textSprite.body.gravity.y = playerGravity;
        }

        //cursor bewegen, wenn er gefallen ist
        if (cursors.left.isDown && player.body.gravity.y == playerGravity)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
        else if (cursors.right.isDown && player.body.gravity.y == playerGravity)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');
        }

        // Fallschirm oeffnen sobald Ground sichtbar ist
        if (cursors.up.isDown && player.body.y >= game.world.height-600)
        {
            textSprite.body.gravity.y = 0;
            player.body.velocity.y = 180;
            player.animations.play('down');
            fallschirmOffen = true; 
        } 
        else if (fallschirmOffen == false && player.body.y >= game.world.height-150) {
            textSprite.body.gravity.y = 0;
            player.animations.stop();
            player.frame = 3;
        }

        if (fallschirmOffen == true)
        {
            player.animations.play('down');
        }        

        if (game.camera.view.y<2400 && moveCamera==true)
        {
            game.camera.view.x=100;
            game.camera.view.y=200;
            game.camera.bounds.y=player.y;
        } else {
            moveCamera=false;
            game.camera.view.y=2400;
        }

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, birds, collideBird, null, this);
    }

    function render() 
    {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(player, 32, 500);
    }

    function collectStar (player, star) 
    {
        // Removes the star from the screen
        star.kill();

        //  Add and update the starScore
        score += 1;
        scoreText.text = 'Sterne: ' + score;
        for (var i = 1; i < 10; i++)
        {
            if (score >=3*i) {
                lifes += 1;
                lifesText.text = 'Leben: ' + lifes;
            }
        }
    }

    function collideBird (player, birds) 
    {
        // Removes the player from the screen
        player.animations.play('dead');
        game.time.events.add(250, function() {
            player.kill();
            birds.kill();
        })
    }
}
