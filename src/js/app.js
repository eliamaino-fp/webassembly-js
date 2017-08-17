import { game } from './modules/game'

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 4 ? 0 : 1)

const COLUMNS = 800;
const LINES = 450;
const STRATEGY = 'vanilla';

let next = game(
  document.getElementById('game'),
  COLUMNS,
  LINES,
  createGameMatrix(LINES, COLUMNS),
  STRATEGY
), i = 0;

let loop = () => {
  next().then(() => {
      requestAnimationFrame(loop);
  });
}

loop();
