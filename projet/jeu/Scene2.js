class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    
  
    create() {
        //console.log("La scène a été créée.");

        
        // Background
        this.background = this.add.tileSprite(400, 300, 480, 272, "background");
        //console.log(config.width);
        //this.background.setOrigin(0, 0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;



// Ground
let platforms;

// Initialize the group
platforms = this.physics.add.staticGroup();

// Create the ground.
const ground = platforms.create(0, config.height - 64, 'ground');

// Scale it to fit the width of the game (the original sprite is 400x32 in size)
ground.setScale(1, 1);

// Now let's create two ledges
let ledge = platforms.create(400, 450, 'ground');
ledge.setImmovable(true);

ledge = platforms.create(-75, 350, 'ground');
ledge.setImmovable(true);



        /*



        this.ground = this.physics.add.staticGroup();
        let groundSprite = this.ground.create(400, 600, 'ground');
        //groundSprite.setOrigin(100, 200); // Régler l'origine si nécessaire
        groundSprite.displayWidth = this.sys.game.config.width; // Ajuster la largeur à la largeur du jeu
        groundSprite.displayHeight = 100; // Ajuster la hauteur selon vos besoins
        groundSprite.refreshBody(); // Mettre à jour le corps physique
        */


        // Player
            

                
        this.player = new Player(this, 100, 400, "idlePlayer");
        this.player.play('thrust');
        //this.idlePlayer = this.physics.add.sprite(100,400, "idlePlayer");
        console.log("Le joueur a été créé.");
        
        //this.idlePlayer.play('thrust');
        console.log("L'animation 'thrust' a été lancée.");

        



        // Ennemy
    

        
        this.ennemy = new Ennemy(this, 100, 400, "idleEnnemy");
        this.ennemy.play('thrust_ennemy');
        //this.idlePlayer = this.physics.add.sprite(100,400, "idlePlayer");


        //this.idlePlayer.setCollideWorldBounds(true);
/*         this.idlePlayer.setBounce(0.2);
        this.idlePlayer.setScale(1,1);
        this.idlePlayer.setGravityY(300);
        this.idlePlayer.setOrigin(0,3);
        this.idlePlayer.setSize(30,100);
        //this.idlePlayer.setBodySize(64, 64, true);
        this.idlePlayer.setOffset(50,30); */
        //this.idlePlayer.setPosition(0, 0 + this.idlePlayer.displayHeight / 3); // Ajustez la position pour aligner les pieds


        // Cursors

        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    

    



        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.ennemy, platforms);


        //this.player.createHealthBar();
        //this.idlePlayer.setDepth(1);

        





    }
    update() {   

        this.player.update();
        //this.ennemy.update();

        this.player.handleAttack(this.ennemy);
        //this.player.dealDamage(this.ennemy);

        this.ennemy.handleAttack(this.player);
        //this.ennemy.dealDamage(this.player);
        
        
        
        
    } 
  }
  