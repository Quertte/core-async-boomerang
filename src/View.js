// Сделаем отдельный класс для отображения игры в консоли.

class View {
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

module.exports = View;
