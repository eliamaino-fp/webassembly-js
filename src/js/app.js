import Game from './game'

const createGameMatrix = (width, height) => new Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 2);

console.info(createGameMatrix(100, 100));

let game = new Game(
  document.getElementById('game'),
  100,
  100,
  createGameMatrix(100, 100)
);

let loop = () => {
  game.next();
  requestAnimationFrame(loop);
}

loop();