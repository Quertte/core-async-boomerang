const { Player } = require('../db/models');
const { sequelize } = require('../db/models/index');

async function writeToDB(name) {
  // try {
  //   await sequelize.authenticate();
  //   console.log('соединение установлено');
  // } catch (error) {
  //   console.log('не удалось');
  // }
  await Player.create({
    name: `${name}`,
    score: 0,
  });
}
// writeToDB();

//   // вытаскиваем юзера
async function changeDB(name) {
  const playerThatAlreadyPlaid = await Player.findOne({
    where: {
      name: `${name}`,
    },
  });
  // console.log(playerThatAlreadyPlaid);
  if (playerThatAlreadyPlaid === null) {
    await writeToDB(name);
    // eslint-disable-next-line no-unused-expressions
  } else {
    (playerThatAlreadyPlaid.score = 50), playerThatAlreadyPlaid.save();
  }
}

// changeDB('Alina');
// writeToDB('Alina');
module.exports = changeDB;
//   // проверяем юзера на то, равен ли они новому игроку
//   if (playerThatAlreadyPlaid === this.hero.name) {
//     // вытаскиваем очки
//     const checkForScore = await Player.findOne({
//       where: {
//         name: `${playerThatAlreadyPlaid}`,
//       },
//     }).score;
//     if (checkForScore >= this.score) {
//       playerThatAlreadyPlaid.score = checkForScore;
//       await playerThatAlreadyPlaid.save();
//     } else {
//       playerThatAlreadyPlaid.score = this.score;
//       await playerThatAlreadyPlaid.save();
//     }
//   } else {
//     addPlayesrAndScoreNew(){
//     Player.create({
//       name: `${this.hero.name}`,
//       score: `${this.score}`,
//     });
//   }
// }
// addPlayesrAndScore();

// module.exports = checkForPlayersAndScore;
