// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');

// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const changeBD = require('./writePlayerToBD');
// const checkForPlayersAndScore = require('./checkForPlayerAndScore');
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
    this.view = new View();
    this.hero = new Hero({
      position: 0,
      boomerang: new Boomerang(),
    }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.track = [];
    this.regenerateTrack();
    // this.score = 0;
  }
  // проверяет на существование игрока, если его нет - записывает, если он есть - меняет его результат

  async generateName() {
    const playerName = await this.view.readName();
    this.hero.heroName = playerName;
    await changeBD(this.hero.heroName);
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

  async check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
    if (this.hero.boomerang.direction) {
      this.hero.boomerang.flyRight();
    } else {
      this.hero.boomerang.flyLeft();
    }
    if (this.hero.boomerang.position >= this.enemy.position) {
      this.hero.boomerang.direction = false;
      this.enemy.die();
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
const newGame = new Game().generateName();

module.exports = Game;
