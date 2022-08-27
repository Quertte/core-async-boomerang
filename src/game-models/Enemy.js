// Враг.
// const Hero = require('./Hero');

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 2;
  }

  generateSkin() {
    const skins = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = '?';
    // this.hero.score += 10;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
