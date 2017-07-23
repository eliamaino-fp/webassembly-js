import { game } from './game'

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 2);

const LINES = 400;
const COLUMNS = 225;

let next = game(
  document.getElementById('game'),
  LINES,
  COLUMNS,
  createGameMatrix(LINES, COLUMNS)
);

let loop = () => {
  next();
  requestAnimationFrame(loop);
}

loop();
