// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = 1;
    this.direction = null;
  }

  flyRight() {
    this.moveRight();
  }
  flyLeft() {
    this.moveLeft();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    return this.position;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    return this.position;
  }
}

module.exports = Boomerang;
