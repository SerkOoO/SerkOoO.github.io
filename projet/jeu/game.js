
var gameSettings = {
    playerSpeed: 100,
}
 

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#5DACD8',
    scene: [Scene1, Scene2],
    physics: {
        default: "arcade",
        arcade:{
            debug: true,
            debugShowVelocity: true
        }
      }
};

var game = new Phaser.Game(config);

