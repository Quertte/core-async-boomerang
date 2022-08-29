// Сделаем отдельный класс для отображения игры в консоли
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

class View {

  readName() {
    return new Promise((resolve, reject) => {
      rl.question(
        '\n\nПривет,  и кто же у нас тут сегодня играет??\n\n',
        (answer) => {
          resolve(answer);
          rl.close();
        }
      );
    });
  }


  // eslint-disable-next-line class-methods-use-this

  render(track) {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

// const view = new View().readName();
module.exports = View;
