// Враг.
// const Hero = require('./Hero');

class Enemy {
  constructor() {
    this.skin = this.generateSkin();
    this.position = 50;
  }

  generateSkin() {

    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)]
    return this.skin;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    return this.position;
  }

  die() {
    this.position = undefined;
    console.log('Enemy is dead!💀');
    // process.exit();
  }
}

module.exports = Enemy;
