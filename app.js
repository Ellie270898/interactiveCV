const mainState =
{
  preload: function ()
  {
    game.load.image('background','assets/background.png');
    game.load.spritesheet('spritesheet', 'assets/animation7.png', 108, 140);
    game.load.spritesheet('tubes', 'assets/tubespritesheet.png', 500, 500, 14 );
    game.load.spritesheet('writing', 'assets/writing.png', 500, 200, 12 );
    game.load.image('light', 'assets/light.png');
    game.load.image('writingtrigger', 'assets/writingtrigger.png');
    game.load.image('foreground', 'assets/foreground.png');
    game.load.image('light', 'assets/light.png');
    game.load.image('lightOn', 'assets/lightOn.png');
    game.load.image('tubesUp', 'assets/tubesUp.png');
    game.load.image('floor', 'assets/floor.png');
  //  game.load.image('tubes', 'assets/tubes.png');
    },

  create: function ()
 {
   var player1;
   var lightOn;
   //This code is for the map
   this.game.physics.startSystem(Phaser.Physics.ARCADE);
   game.add.tileSprite(0, 0, 4200, 500, 'background');
   game.world.setBounds(0, 0, 4200, 500);
   //This places the trigger for light to switch on
   this.lightOn =game.add.sprite(2300, 3, 'lightOn');
   this.lightOn.enableBody = true;
   game.physics.arcade.enable(this.lightOn);
   this.lightOn.physicsBodyType = Phaser.Physics.ARCADE;
   this.lightOn.collideWorldBounds = true;

   //This places the trigger for the tubes to come up
   this.tubesUp =game.add.sprite(2900, 3, 'tubesUp');
   this.tubesUp.enableBody = true;
   game.physics.arcade.enable(this.tubesUp);
   this.tubesUp.physicsBodyType = Phaser.Physics.ARCADE;
   this.tubesUp.collideWorldBounds = true;

   //This places the trigger for the writing to be displayed
   this.writingtrigger =game.add.sprite(1430, 3, 'writingtrigger');
   this.writingtrigger.enableBody = true;
   game.physics.arcade.enable(this.writingtrigger);
   this.writingtrigger.physicsBodyType = Phaser.Physics.ARCADE;
   this.writingtrigger.collideWorldBounds = true;

   //This code makes the writing exists
    this.writing = game.add.sprite(1510, 70, 'writing');
    //this.tubes.exists = false;
    //this.tubes.visible = false;
    this.writing.animations.add('writing');

   //This code makes the tubes exists
    this.tubes = game.add.sprite(3065, 0, 'tubes');
    //this.tubes.exists = false;
    //this.tubes.visible = false;
    this.tubes.animations.add('tubes');
   //This tells the camera to follow the player
     game.camera.follow(this.player1);

     game.add.sprite(0, 0, 'floor');

     //This code creates the player and animations for running and walking
     this.player1 = this.spritesheet =game.add.sprite(100, 262, "spritesheet");
     this.player1.enableBody = true;
     game.physics.arcade.enable(this.player1);
     this.player1.physicsBodyType = Phaser.Physics.ARCADE;
     this.player1.collideWorldBounds = true;
     this.spritesheet.animations.add('still', [8], 1, true);
     this.spritesheet.animations.add('walk', [0,1,2,3,4,5,6,7], 18, true);
     this.spritesheet.animations.add('shoot', [9], 1, true);
     this.speed = 4;

    //This adds foreground to the map

     game.add.sprite(0, 0, 'foreground');

 },

 write: function (writingtrigger, player1) {
   console.log('qualifications!');
   this.writingtrigger.kill();
  // this.tubes = game.add.sprite(0, 0, 'tubes');
   this.writing.animations.play('writing',[0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,12], 0.5);

  },

light: function (lightOn, player1) {
  console.log('Light On!');
  this.lightOn.kill();
  game.add.sprite(0, 0, 'light');
 },

 tubesMove: function (tubesUp, player1) {
   console.log('Tubes up!');
   this.tubesUp.kill();
  // this.tubes = game.add.sprite(0, 0, 'tubes');
   this.tubes.animations.play('tubes',[0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14], 1);

  },


  update: function ()
  {

    game.physics.arcade.collide(this.lightOn, this.player1, this.light, null, this);
    game.physics.arcade.collide(this.tubesUp, this.player1, this.tubesMove, null, this);
    game.physics.arcade.collide(this.writingtrigger, this.player1, this.write, null, this);

    //THIS ALLOWS THE CAMERA AND PLAYER TO MOVE LEFT WHEN THE LEFT ARROW IS HELD DOWN
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
          this.spritesheet.x-=this.speed;
          this.spritesheet.play('walk');
          this.spritesheet.scale.x=-1;
          game.camera.x = this.player1.x - 200;
          game.camera.y = this.player1.y - 200;
    //THIS ALLOWS THE CAMERA AND PLAYER TO MOVE RIGHT WHEN THE RIGHT ARROW IS HELD DOWN
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
          this.spritesheet.x+=this.speed;
          this.spritesheet.play('walk');
          this.spritesheet.scale.x=1;
          game.camera.x = this.player1.x - 200;
          game.camera.y = this.player1.y - 200;

        }
       else if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
       {
          console.log('Enter');
          this.light =game.add.sprite(0, 0, 'light');
          this.light.enableBody = true;
          game.physics.arcade.enable(this.light);
          this.light.physicsBodyType = Phaser.Physics.ARCADE;
         }

        else
      {
        this.spritesheet.play('still');
      //  game.physics.arcade.overlap(this.lightOn, this.player1, this.light, null, this);
      }

  },
}




const game = new Phaser.Game(700, 500);
game.state.add('main', mainState);
game.state.start('main');
