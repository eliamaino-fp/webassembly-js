import { game } from './modules/game'

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 4 ? 0 : 1)

const COLUMNS = 800;
const LINES = 450;

let next = game(
  document.getElementById('game'),
  COLUMNS,
  LINES,
  createGameMatrix(LINES, COLUMNS),
  false,
  false
), i = 0;

let loop = () => {
  next().then(() => {
      requestAnimationFrame(loop);
  });
}

loop();
