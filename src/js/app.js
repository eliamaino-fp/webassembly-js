import { game } from './modules/game'

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 4 ? 0 : 1)

const LINES = 400;
const COLUMNS = 225;

let next = game(
  document.getElementById('game'),
  LINES,
  COLUMNS,
  createGameMatrix(LINES, COLUMNS),
  true
), i = 0;

let loop = () => {
  next().then(() => {
    if (i++ < 10)
      requestAnimationFrame(loop);
  });
}

loop();
