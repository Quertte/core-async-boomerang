const { Player } = require('../db/models');
const { sequelize } = require('../db/models/index');

async function writeToBD(name) {
  // try {
  //   await sequelize.authenticate();
  //   console.log('соединение установлено');
  // } catch (error) {
  //   console.log('не удалось');
  // }
  await Player.create({
    name: `${name}`,
    score: 0, // this.game.score
  });
}

async function changeBD(name) {
  const playerThatAlreadyPlaid = await Player.findOne({
    where: {
      name: `${name}`,
    },
  });

  if (playerThatAlreadyPlaid === null) {
    await writeToBD(name);
  } else if (playerThatAlreadyPlaid.score < 100) {
    // this.game.score
    // eslint-disable-next-line no-unused-expressions
    (playerThatAlreadyPlaid.score = 100), playerThatAlreadyPlaid.save();
  }
}

module.exports = changeBD;
