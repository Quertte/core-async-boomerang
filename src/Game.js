// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const { runInteractiveConsole } = require('./keyboard');
const changeBD = require('./writePlayerToBD');
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0, boomerang: new Boomerang(), score: 0 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    this.enemy.position = this.enemy.moveLeft();
    this.track[this.enemy.position] = this.enemy.skin;
  }
  async generateName() {
    const playerName = await this.view.readName();
    this.hero.heroName = playerName;
    await changeBD(this.hero.heroName);
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
      this.generateName();
    }
    if (this.hero.boomerang.direction) {
      this.hero.boomerang.flyRight();
    } else {
      this.hero.boomerang.flyLeft();
    }
    if (this.hero.boomerang.position >= this.enemy.position) {
      this.hero.boomerang.direction = false;
      this.enemy.die();
      this.hero.score += 10;
      this.enemy = new Enemy();
    }
  }

  play() {
    runInteractiveConsole(this);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 45);
  }
}
// const newGame = new Game().generateName();
module.exports = Game;
