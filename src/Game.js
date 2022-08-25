// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
    this.score = 0
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.score +=10
  }

  async check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();

      const playerThatAlreadyPlayd = await User.findOne({
          where: {
            name: `${this.hero.name}`,
          },
        });

         if (playerThatAlreadyPlayd === this.hero.name ){
          const checkForScore = await User.findOne({
            where: {
              name: `${playerThatAlreadyPlayd}`,
            },
          });
          if (checkForScore >= this.score){
            playerThatAlreadyPlayd.score = checkForScore;
            await playerThatAlreadyPlayd.save();
          } else {
            playerThatAlreadyPlayd.score = this.score;
            await playerThatAlreadyPlayd.save();
          }
         }
         
         else {
         await addPlayesrAndScoreNew() {
           Player.create({
             name: `${this.hero.name}`,
             score: `${this.score}`
           });
         }
       }
      addPlayesrAndScore();
      console.log(this.check());
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    });
  }
}

module.exports = Game;
