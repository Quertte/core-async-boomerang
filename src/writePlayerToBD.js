const { Player } = require('../db/models');
const { sequelize } = require('../db/models/index');
const { Game } = require('./Game');

async function writeToBD(name, score) {
  // try {
  //   await sequelize.authenticate();
  //   console.log('соединение установлено');
  // } catch (error) {
  //   console.log('не удалось');
  // }
  await Player.create({
    name,
    score, // this.game.score
  });
}

async function changeBD(name, score) {
  const playerThatAlreadyPlaid = await Player.findOne({
    where: {
      name,
    },
  });

  if (playerThatAlreadyPlaid === null) {
    await writeToBD(name, score);
  } else if (playerThatAlreadyPlaid.score < score) {
    // this.game.score
    // eslint-disable-next-line no-unused-expressions
    playerThatAlreadyPlaid.score = score;
    await playerThatAlreadyPlaid.save();
  }
}

module.exports = changeBD;
