import { game } from './modules/game'
import { getNextState } from './modules/environment';
import { cEnvironment } from './modules/c/c_environment';
import { splitJob } from './modules/worker-dispacher';

const createGameMatrix = (width, height) => new Uint8Array(width * height).fill(0)
  .map(() => Math.ceil(Math.random() * 1000) % 4 ? 0 : 1)

const COLUMNS = 800;
const LINES = 450;
const STRATEGY = 'workers';
const initialConfig = createGameMatrix(LINES, COLUMNS);
const next = game(
  document.getElementById('game'),
  COLUMNS,
  LINES,
  initialConfig,
  strategy(STRATEGY, COLUMNS, LINES, initialConfig)
);

function strategy(strategyType, columns, lines, firstGeneration) {
  if (strategyType === 'wasm') {
    return cEnvironment(columns, lines, firstGeneration);
  } else if (window.Worker && strategyType === 'workers') {
    return splitJob(2);
  } else {
    return getNextState;
  }
}

function loop() {
  next().then(() => {
    requestAnimationFrame(loop);
  });
};

loop();
