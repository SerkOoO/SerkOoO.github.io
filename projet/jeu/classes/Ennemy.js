class Ennemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setScale(1, 1);
        this.setGravityY(300);

        this.setSize(30, 80); // Ajustez la taille du rectangle de collision
        
        this.setOffset(50, 50); // Ajustez la position verticale du rectangle de collision
        this.setGravityY(300);
        // Autres propriétés et méthodes spécifiques au joueur
        this.health = 100;
        this.createHealthBar();

        this.attackCount = 0;
        this.attackingEnnemy = false;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        scene.anims.create({
            key: "thrust_ennemy",
            frames: scene.anims.generateFrameNumbers("idleEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "run_ennemy",
            frames: scene.anims.generateFrameNumbers("runningEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, 
            repeat: -1 
        });

        scene.anims.create({
            key: "jump_ennemy",
            frames: scene.anims.generateFrameNumbers("jumpingEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });


        scene.anims.create({
            key: "attack_ennemy",
            frames: scene.anims.generateFrameNumbers("attackingEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "attack2_ennemy",
            frames: scene.anims.generateFrameNumbers("attackingEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "attack3_ennemy",
            frames: scene.anims.generateFrameNumbers("attackingEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "hurt_ennemy",
            frames: scene.anims.generateFrameNumbers("hurtEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "die_ennemy",
            frames: scene.anims.generateFrameNumbers("dieEnnemy"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 1     // Répétez l'animation indéfiniment
        });

        this.play("thrust_ennemy");
    }

    playHitAnimation() {

        this.play("die_ennemy", true); // Remplacez "hit" par le nom de votre animation
    }


    createHealthBar() {
        // Créez la barre de vie
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();
    }

    updateHealthBar() {
        // Mettez à jour la barre de vie en fonction des points de vie actuels
        this.healthBar.clear();
        this.healthBar.fillStyle(0xFF0000, 1);
        this.healthBar.fillRect(this.x - 50, this.y - 60, 100, 10); // Position et taille de la barre de vie
    
        // Calculez la largeur de la barre de vie en fonction des points de vie
        const width = (this.health / 100) * 100;
        this.healthBar.fillStyle(0x00FF00, 1);
        this.healthBar.fillRect(this.x - 50, this.y - 60, width, 10);
    }


    dealDamage(enemy) {
        // Ajoutez la logique pour calculer les dégâts ici
        const damageAmount = 10; // Vous pouvez ajuster cela en fonction de vos besoins

        // Appliquez les dégâts à l'ennemi
        enemy.health -= damageAmount;

        // Vérifiez si l'ennemi est mort
        if (enemy.health < 0) {
            // L'ennemi est mort, ajoutez ici toute logique supplémentaire
            // par exemple, détruire l'ennemi, déclencher une animation, etc.
            enemy.destroy();
        }

        // Mettez à jour la barre de vie de l'ennemi
        //enemy.updateHealthBar();
    }


    handleAttack(enemy) {
        if (this.attackingPlayer) {
            // Vérifiez si le joueur touche l'ennemi, vous devrez peut-être ajuster ces conditions
            const isAttacking = this.isPlayingAnimation("attack") || this.isPlayingAnimation("attack2") || this.isPlayingAnimation("attack3");
            
            if (isAttacking && Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), enemy.getBounds())) {
                // L'attaque réussit, infligez des dégâts à l'ennemi
                this.dealDamage(enemy);
            }
        }
    }



    create(){
        

    }

    update(){
        this.updateHealthBar();
  
    }

}
