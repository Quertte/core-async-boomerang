const { Player } = require('../db/models');
const { sequelize } = require('../db/models/index');

async function checkForPlayerInTable() {
  await Player.findOne({
    where: {
      name: `Oleg`,
    },
  });
}
// console.log(await checkForPlayerInTable());
module.exports = checkForPlayerInTable;
