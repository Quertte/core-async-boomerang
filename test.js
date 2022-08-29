const keypress = require('keypress');

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  console.log('got "keypress"', key);
  if (key.ctrl && key.name === 'c') {
    process.stdin.pause();
  }
});

process.stdin.resume();
