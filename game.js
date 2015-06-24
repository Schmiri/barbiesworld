var game = new Phaser.Game(1024, 1200, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ground', 'assets/ground.png');
    //game.load.image('player', 'assets/playerJump.png');
    game.load.image('bird', 'assets/bird.png');
    //game.load.spritesheet('dude', 'assets/player2.png', 275, 315, 3);
    game.load.spritesheet('dude', 'assets/player2.png', 275, 315, 2);
    game.load.image('heli', 'assets/helicopter.png');
    game.load.spritesheet('bird', 'assets/bird.png', 73, 51, 4)
    game.load.image('star', 'assets/star.png');


}
var stars;
var player;
var heli;
var bird;
var cursors;
var score = 0;
var birddirection = 200;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //set background
    game.stage.backgroundColor = '#9EDEF2';
    ground = game.add.sprite(0, game.world.height-290, 'ground');
    ground.scale.setTo(1.3,1); //doppelt so breit

    //  This stops it from falling away when you jump on it
    //ground.body.immovable = true;

    //set heli außerhalb vom spielfeld (rechts)
    heli = game.add.sprite(game.world.width+300, 0, 'heli');
    //heli.anchor.setTo(0.5, 0.0);

    // The player and its settings
    player = game.add.sprite(game.world.width+390, -60, 'dude');
    //player.scale.setTo(1,1); //doppelt so breit

    //player sprite wird verschoben
    player.animations.add('up', [0, 1], 2, true);
    player.animations.add('left', [1, 0], 2, true);
    player.animations.add('right', [1, 0], 2, true);



    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  a bird to collide
    bird = game.add.sprite(10, 400, 'bird');
    game.physics.arcade.enable(bird);
    bird.body.enable = true;
    

    //player sprite wird verschoben
    bird.animations.add('right', [0, 1], 4, true);
    bird.animations.add('left', [2, 3], 4, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * Math.random()*500+100, i * Math.random()*800+400, 'star');
    }
    
    game.camera.follow(player);

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
   //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    bird.body.velocity.x = 0;


    //bei start kommt heli mit dude reingeflogen    
    if (heli.x > game.world.centerX-200) {
        heli.x -= 4;
        player.x -= 4; //geschwindigkeit und position             
    }
    
    //Player springt los, erst wenn der heli angekommen ist
    if (cursors.up.isDown && heli.x<=game.world.centerX-200)
    {
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //player.body.velocity.y = -350; //hochspringen
        player.frame = 3;

    }

    // bird fliegen lassen
    if (bird.body.x>=game.world.centerX)
    {
        //bird.x += 4;
        birddirection = -200;
        bird.animations.play('left');
    
    }
    else if (bird.body.x<=20)
    {
        //bird.x += 4;
        birddirection = 200;
        bird.animations.play('right');
    
    } 
    bird.body.velocity.x = birddirection;


    //cursor bewegen, wenn er gefallen ist
    if (cursors.left.isDown && player.body.gravity.y == 300)
    {
        //  Move to the left
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    else if (cursors.right.isDown && player.body.gravity.y == 300)
    {
        //  Move to the right
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
        game.camera.view.x=100;
        game.camera.view.y=200;
        game.camera.bounds.y=player.y;
        //game.camera.bounds.x=player.x;

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
}

function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}

/*function collideBird (player, bird) {

    // Removes the player from the screen
    player.kill();

}*/
