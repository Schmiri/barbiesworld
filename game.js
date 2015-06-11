
var game = new Phaser.Game(1024, 1200, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ground', 'assets/ground.png');
    //game.load.image('player', 'assets/playerJump.png');
    game.load.image('bird', 'assets/bird.png');
    game.load.spritesheet('dude', 'assets/player.png', 250, 315, 3);
    game.load.image('heli', 'assets/helicopter.png');


}
var player;
var heli;
var cursors;


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
    player.animations.add('up', [0, 1], 3, true);
    player.animations.add('left', [1, 0], 3, true);
    player.animations.add('right', [1, 0], 3, true);



    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    game.camera.follow(player);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
   //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    //bei start kommt heli mit dude reingeflogen    
    if (heli.x > game.world.centerX-200) {
        heli.x -= 4;
        player.x -= 4; //geschwindigkeit und position             
    };
    
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

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
