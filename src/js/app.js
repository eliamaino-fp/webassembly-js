import Game from './game'

function createGameMatrix (width, height) {
  let gameMatrix = new Array(height);

  for (let y = 0; y < height; y++) {
    gameMatrix[y] = new Array(width).fill(0);
    for (let x = 0; x < width; x++) {
      gameMatrix[y][x] = Math.ceil(Math.random() * 1000) % 2 ? 0 : 1;
    }
  }

  return gameMatrix.slice();
}

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