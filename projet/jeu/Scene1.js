class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        //----------- assets -------------------//
        this.load.image("background", "assets/Background/Background.png", {
            frameWidth: 160,
            frameHeight: 110,
        });

        this.load.image("ground", "assets/Tuiles/PNG/Environment/ground_snow_small.png", {
            frameWidth: 160,
            frameHeight: 110,
        });

        //--------- PLAYER ---------------------//

        this.load.spritesheet("idlePlayer", "assets/Sprites2/Fighter/Idle.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("runningPlayer", "assets/Sprites2/Fighter/Run.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("jumpingPlayer", "assets/Sprites2/Fighter/Jump.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("attackingPlayer", "assets/Sprites2/Fighter/Attack_1.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("attackingPlayer2", "assets/Sprites2/Fighter/Attack_2.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("attackingPlayer3", "assets/Sprites2/Fighter/Attack_3.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("shieldPlayer", "assets/Sprites2/Fighter/Shield.png", {
            frameWidth: 128,
            frameHeight: 128,

        });



        //--------------- ENNEMY -------------------//

        this.load.spritesheet("idleEnnemy", "assets/Sprites2/Samurai/Idle.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("runningEnnemy", "assets/Sprites2/Samurai/Run.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("jumpingEnnemy", "assets/Sprites2/Samurai/Jump.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("attackingEnnemy", "assets/Sprites2/Samurai/Attack_1.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("attackingEnnemy", "assets/Sprites2/Samurai/Attack_2.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("attackingEnnemy", "assets/Sprites2/Samurai/Attack_3.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("hurtEnnemy", "assets/Sprites2/Samurai/Hurt.png", {
            frameWidth: 128,
            frameHeight: 128,

        });

        this.load.spritesheet("dieEnnemy", "assets/Sprites2/Samurai/Dead.png", {
            frameWidth: 128,
            frameHeight: 128,

        });


    }

    create() {
        this.add.text(20, 20, "Loading game...");
        /*

        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("idlePlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 1 // Répétez l'animation indéfiniment
        });

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("runningPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 1 // Répétez l'animation indéfiniment
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("jumpingPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });

        this.anims.create({
            key: "fall",
            frames: this.anims.generateFrameNumbers("fallingPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });

        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("attackingPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        let x = 100; // Replace with the appropriate x coordinate
        let y = 300; // Replace with the appropriate y coordinate
        let newX = 400;
        let newY = 400;
        let player = this.add.sprite(x, y, "runningPlayer");
        player.setOrigin(0.5, 0.5);
        player.anims.play("thrust");
        player.setPosition(newX, newY); // Ajustez la position


        
        */
        

        this.scene.start("playGame");
    }
}
