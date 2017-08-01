import { game } from './modules/game'

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 4 ? 0 : 1)

<<<<<<< HEAD
const COLUMNS = 800;
const LINES = 450;
=======
const LINES = 200;
const COLUMNS = 200;
>>>>>>> 6bdd597... emscripten working

let next = game(
  document.getElementById('game'),
  COLUMNS,
  LINES,
<<<<<<< HEAD
  createGameMatrix(LINES, COLUMNS),
  false
), i = 0;

let loop = () => {
  next().then(() => {
      requestAnimationFrame(loop);
  });
}

// let loop = () => {
//   next();
//   requestAnimationFrame(loop);
// }
=======
  createGameMatrix(COLUMNS, LINES)
);

let loop = () => {
  next();
  requestAnimationFrame(loop);
}
>>>>>>> 6bdd597... emscripten working

loop();
