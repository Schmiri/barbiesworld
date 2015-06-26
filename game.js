


function playGame() {

    var game = new Phaser.Game(1024, 630, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() 
    {
        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.image('ground', 'assets/ground.png');
        game.load.image('bird', 'assets/bird.png');
        game.load.spritesheet('dude', 'assets/player2.png', 275, 315, 3);
        game.load.image('heli', 'assets/helicopter.png');
        game.load.spritesheet('bird', 'assets/bird.png', 73, 51, 4)
        game.load.image('star', 'assets/star.png');
    // ToDo: Bild aus AI neu abspeichern (groesser)
        game.load.image('cloud', 'assets/cloud2.png');
    }

    // anzahl der Weltgroesse/ Sprunghöhe (aendert sich im level)
    var worldHeight = 3000;
    var player; 
    // Fallgeschwindigkeit des Players (aendert sich im level)
    var playerGravity = 250;
    var fallschirmOffen = false; 
    var heli;
    var clouds;
    var birds;
    // anzahl der voegel (aendert sich im level)
    var birdLevel = 3;
    var birddirection = 200;
    var birdMove =true;
    var stars;
    // anzahl der sterne (aendert sich im level)
    var starlevel = 4;

    var cursors;
    var score = 0;
    var scoreText;
    var moveCamera=true;

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
        for (var i = 0; i < starlevel; i++)
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
        player.animations.add('up', [0, 1], 3, true);
        player.animations.add('left', [1, 0], 3, true);
        player.animations.add('right', [1, 0], 3, true);
        player.animations.add('down', [2], 3, true);

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  some birds to collide
        birds = game.add.group();
        game.physics.arcade.enable(birds);
        birds.enableBody = true;

        //  Here we'll create 3 left of them evenly spaced apart
        for (var i = 0; i < birdLevel; i++)
        {
            //  Create a star inside of the 'stars' group
            var bird = birds.create(10, i * Math.random() *600 + 600, 'bird');
            //bird sprite wird verschoben
            bird.animations.add('right', [0, 1], 4, true);
            bird.animations.add('left', [2, 3], 4, true);

    // ToDo: Bird kehrt nicht in der mitte der Welt um sondern fliegt durch 
            //bird.body.velocity.x = 0;
            bird.body.velocity.x = birddirection;

            if (bird.body.x>=game.world.centerX)
            {
                birddirection = -200;
                bird.animations.play('left');
            }
            else if (bird.body.x<=20)
            {
                birddirection = 200;
                bird.animations.play('right');
            } 
            
        }

        game.camera.follow(player);

        //  The score
    // ToDo: der Score ist momentan noch fest prositioniert - soll aber dem Player folgen
        scoreText = game.add.text(16, 16, 'score: 0', { families: [ 'Amatic+SC::latin' ], fontSize: '64px', fill: '#000' });
         
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

    }

    function update() 
    {
       //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        
        // Bounding-Box settings
        player.body.setSize(65, 150, 137, 161);

        //bei start kommt heli mit dude reingeflogen    
        if (heli.x > game.world.centerX-200) 
        {
            //geschwindigkeit und position   
            heli.x -= 4;
            player.x -= 4;           
        }
        
        //Player springt los, erst wenn der heli angekommen ist
        if (cursors.down.isDown && heli.x<=game.world.centerX-200)
        {
            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.1;
            player.body.gravity.y = playerGravity;
            player.body.collideWorldBounds = true;
            player.frame = 3;
        }

        // bird fliegen lassen
        /*if (bird.body.x>=game.world.centerX)
        {
            birddirection = -200;
            bird.animations.play('left');
        }
        else if (bird.body.x<=20)
        {
            birddirection = 200;
            bird.animations.play('right');
        } 
        bird.body.velocity.x = birddirection;*/

        // bird fliegen lassen
        

        //cursor bewegen, wenn er gefallen ist
        if (cursors.left.isDown && player.body.gravity.y == playerGravity)
        {
            //  Move to the left
            player.body.velocity.x = -250;
            player.animations.play('left');
        }
        else if (cursors.right.isDown && player.body.gravity.y == playerGravity)
        {
            //  Move to the right
            player.body.velocity.x = 250;
            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 3;
        }

        // Fallschirm oeffnen sobald Ground sichtbar ist
        if (cursors.up.isDown && player.body.y >= game.world.height-600)
        {
            player.body.velocity.y = 180;
            player.animations.play('down');
            game.add.text(game.world.centerX, game.world.height-500, 'Gewonnen', { fontSize: '64px', fill: '#000' });
            fallschirmOffen = true; 
        } 
        else if (player.body.y >= game.world.height-120 && fallschirmOffen == false) {
// hier kommt zusaetzlich noch ein plattes totes maennchen ;)
            game.add.text(game.world.centerX, game.world.height-500, 'Tot', { fontSize: '64px', fill: '#000' });
        }

        if ((cursors.left.isDown || cursors.right.isDown) && player.body.y >= game.world.height-200 && fallschirmOffen == true)
        {
            player.animations.play('down');
        } 
        else
        {
            //  Stand still
            player.animations.stop();
            player.frame = 3;
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

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    function collideBird (player, birds) 
    {
        // Removes the player from the screen
        player.kill();
        game.add.text(game.world.centerX, player.body.y+300, 'Tot', { fontSize: '64px', fill: '#000' });
    }
}
