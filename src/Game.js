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
  constructor() {
    // this.trackLength = trackLength;
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
    // this.score += 10;
  }

  async check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
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
