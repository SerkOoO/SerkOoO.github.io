class Character extends Phaser.Physics.Arcade.Sprite {
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

        this.health = 100; // Points de vie initiaux
        this.createHealthBar();
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

    // ... (autres méthodes communes à tous les personnages)
}
