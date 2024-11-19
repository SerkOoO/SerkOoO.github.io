class Player extends Phaser.Physics.Arcade.Sprite {
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
        
        
        // Autres propriétés et méthodes spécifiques au joueur
        this.health = 100; // Points de vie initiaux
        this.createHealthBar();
        this.attackCount = 0;
        this.attackingPlayer = false;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


        


        

        scene.anims.create({
            key: "thrust",
            frames: scene.anims.generateFrameNumbers("idlePlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "run",
            frames: scene.anims.generateFrameNumbers("runningPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "jump",
            frames: scene.anims.generateFrameNumbers("jumpingPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: -1 // Répétez l'animation indéfiniment
        });


        scene.anims.create({
            key: "attack",
            frames: scene.anims.generateFrameNumbers("attackingPlayer"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "attack2",
            frames: scene.anims.generateFrameNumbers("attackingPlayer2"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        scene.anims.create({
            key: "attack3",
            frames: scene.anims.generateFrameNumbers("attackingPlayer3"), // Ajustez les numéros de frame appropriés
            frameRate: 10, // Essayez différentes valeurs de frameRate
            repeat: 0     // Répétez l'animation indéfiniment
        });

        this.play("thrust");

        
    }


    dealDamage(enemy, damageAmount) {
        /* const damageAmount = 1; */
    
        enemy.health -= damageAmount;
    
        if (enemy.health <= 0) {
            enemy.play("hurt_ennemy", false);
            enemy.play("die_ennemy", true);
            /* enemy.destroy(); */
            
            return; // Sortir de la fonction si l'ennemi est détruit
        }
    
        enemy.updateHealthBar();
    }
    
    handleAttack(enemy) {

        const playerBody = this.body;
        const playerBounds = new Phaser.Geom.Rectangle(playerBody.x, playerBody.y, playerBody.width, playerBody.height);
        const enemyBody = enemy.body;  // Obtenez le corps physique de l'ennemi
        const enemyBounds = new Phaser.Geom.Rectangle(enemyBody.x, enemyBody.y, enemyBody.width, enemyBody.height);
        if (this.attackingPlayer) {
            const isAttacking = this.isPlayingAnimation("attack");
            this.debugDrawRectangle(playerBounds, 0xFF0000);
            this.debugDrawRectangle(enemyBounds, 0x00FF00);
            // Vérifiez l'intersection en utilisant les coordonnées du joueur et de l'ennemi
            if (isAttacking && Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, enemyBounds) && enemy.health > 0) {
                this.dealDamage(enemy, 0.5);
                enemy.play("hurt_ennemy", true);
                
            }
        }

                if (this.attackingPlayer2) {
            const isAttacking2 = this.isPlayingAnimation("attack2");
            // Vérifiez l'intersection en utilisant les coordonnées du joueur et de l'ennemi
            if (isAttacking2 && Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, enemyBounds) && enemy.health > 0) {
                this.dealDamage(enemy,1);
                enemy.play("hurt_ennemy", true);
            }
        }

                if (this.attackingPlayer3) {
            const isAttacking3 = this.isPlayingAnimation("attack3");
            // Vérifiez l'intersection en utilisant les coordonnées du joueur et de l'ennemi
            if (isAttacking3 && Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, enemyBounds) && enemy.health > 0) {
                this.dealDamage(enemy,2);
                enemy.play("hurt_ennemy", true);
                console.log(enemy.health);
            }
        }
    }


    debugDrawRectangle(rectangle, color) {
        // Cette fonction dessine un rectangle sur la scène pour débogage
        const graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: color } });
        graphics.strokeRectShape(rectangle);
        this.scene.time.delayedCall(1000, () => graphics.destroy(), [], this); // Supprimez le rectangle après 1 seconde
    }
    

    create(){
        

        this.jumpCount = 0;
        this.maxJumpCount = 2; 

        
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

    debugBody(sprite, color) {
        this.body.debugBodyColor = color;
        this.body.debugShowBody = true;
        this.body.debugShowVelocity = true;
    }



    update(){

        this.updateHealthBar();
        
        // Gestion de l'attaque
        const isAttackJustDown = Phaser.Input.Keyboard.JustDown(this.eKey);
        const touchingGround = this.body.touching.down; // Vérifie si le personnage touche le sol
        //console.log(isAttackJustDown);
        //this.attackCount = 0;
        //console.log(this.attackCount);
        
        this.debugBody(this.player, { r: 255, g: 0, b: 0 });

        




         if (isAttackJustDown) {
            if (this.attackCount == 0 && !this.cursors.down.isDown) {
                this.attackingPlayer = true;
                this.play("attack", true);
                this.attackCount = this.attackCount + 1;
                this.setOffset(60,50);
                
            } else if (this.attackCount == 1 && !this.cursors.down.isDown) {
                this.attackingPlayer2 = true;
                this.play("attack2", true);
                this.attackCount = 0;
                this.setOffset(60,50);
            } else if (isAttackJustDown && this.cursors.down.isDown) {
                this.attackingPlayer3 = true;
                this.play("attack3", true);
                this.setOffset(70,50);
                
            }

/*             if(this.eKey.isDown){
                this.attackingPlayer = true;
                this.play("attack", true);
                this.attackingPlayer2 = true;
                this.play("attack2", true);
            } */
 
            
    
     // Joue l'animation d'attaque
        }
    
            // Prioriser l'animation d'attaque
            if (this.attackingPlayer) {
                if (!this.isPlayingAnimation("attack")) {
                    this.attackingPlayer = false; // Réinitialiser le drapeau d'attaque
                    this.setOffset(50,50);
                    
                }
                return; // Stopper la mise à jour pour éviter les conflits d'animation
            }
    
            // Prioriser l'animation d'attaque
            if (this.attackingPlayer2) {
                if (!this.isPlayingAnimation("attack2")) {
                    this.attackingPlayer2 = false; // Réinitialiser le drapeau d'attaque
                    this.setOffset(50,50);
                    
                }
                return; // Stopper la mise à jour pour éviter les conflits d'animation
            }
    
            // Prioriser l'animation d'attaque
            if (this.attackingPlayer3) {
                if (!this.isPlayingAnimation("attack3")) {
                    this.attackingPlayer3 = false; // Réinitialiser le drapeau d'attaque
                    this.setOffset(50,50);
                    
                }
                return; // Stopper la mise à jour pour éviter les conflits d'animation
            }

        // Gestion de la course

        if (!this.cursors.right.isDown && !this.cursors.left.isDown && this.body.touching.down ){
            this.play("thrust", true);
        }
        if (this.cursors.left.isDown && this.body.touching.down) {
            this.setVelocityX(-300);
            this.play("run", true);
        } else if (this.cursors.right.isDown && this.body.touching.down) {
            this.setVelocityX(300);
            this.play("run", true);
        }  else {
            this.setVelocityX(0);
            // this.play('thrust', true); // Ou une autre animation d'idle
        } 


    // Gestion du saut

    const isJumpingJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up);


    if (isJumpingJustDown && (this.jumpCount < 1)){
        this.play("jump", true);
        this.jumping = true;

        this.setVelocityY(-250)
        ++this.jumpCount
    }

    if (touchingGround){
        this.jumpCount = 0;
    }


    if (this.jumping && this.cursors.right.isDown && !this.body.touching.down || !this.body.touching.down && this.cursors.right.isDown) {
        this.setVelocityX(300);
        this.play("jump", true);
    }

    if (this.jumping && this.cursors.left.isDown && !this.body.touching.down || !this.body.touching.down && this.cursors.left.isDown) {
        this.setVelocityX(-300);
        this.play("jump", true);
    }
    /*
    if (this.cursors.up.isDown && this.body.touching.down) {
        this.setVelocityY(-250);
        this.play("jump", true);
        this.jumping = true;
    }

   
    if (this.jumping && this.cursors.up.isDown) {
        this.play("jump", true);
    }



    // Arrêter l'animation de saut si la touche up est relâchée
    if (this.jumping && this.cursors.up.isUp) {
        this.jumping = false;
        // Ajoutez d'autres conditions ou animations si nécessaire
    }
*/

        // Gestion de l'attaque

/*         const isAttackJustDown = Phaser.Input.Keyboard.JustDown(this.eKey);
        if (this.cursors.down.isDown && touchingGround) {
            //this.attackCount = this.attackCount + 1;
            this.play("attack2", true);
            this.attackingPlayer = true; */

  /*           else if (this.attackCount = 2) {
                this.play("attack2", true);
            }
            else if (this.attackCount = 3) {
                this.play("attack3", true);

                this.attackCount = 0;
            } */
            
       // }

    }

    isPlayingAnimation(animationName) {
        return this.anims.getCurrentKey() === animationName && this.anims.isPlaying;
    }
}
