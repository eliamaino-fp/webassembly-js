import { getNextState } from './environment';
import { cEnvironment } from './c/c_environment';
import { splitJob } from './worker-dispacher';
import { getRender } from './render';

export function game(elm, columns, lines, initialConfig, strategy) {
  let state = initialConfig,
    render = getRender(elm, columns, lines),
    nextState;

  if (strategy === 'wasm') {
    nextState = cEnvironment(columns, lines, initialConfig);
  } else if (window.Worker && strategy === 'workers') {
    nextState = splitJob(2);
  } else {
    nextState = getNextState;
  }

  render(state);

  return async function renderState () {
    if (strategy === 'wasm') {
      state = await nextState();
    } else {
      state = await nextState(state, columns, lines);
    }
    render(state);
  }
};
