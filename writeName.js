const { READUNCOMMITTED } = require('sequelize/types/table-hints');
const { sequelize } = require('./db/models');

// async function saveName() {
//   await new Player.create({
//     name: 'Alina',
//     score: 10,
//   });
// }

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database works, my friend! We are the champoins!');
  } catch (e) {
    console.log('looooooser');
  }
}
