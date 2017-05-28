import Game from './game'

Game.setup(
  document.getElementById('game'),
  100,
  100
);

let loop = () => {
  Game.next();
  requestAnimationFrame(loop);
}

loop();