import { getNextState } from './environment';
import { splitJob } from './worker-dispacher';
import { getRender } from './render';
import { CEnvironment } from './c/c_environment'

export function game(elm, columns, lines, initialConfig, useWorker, useC) {
  let state = initialConfig,
    render = getRender(elm, columns, lines),
    nextState,
    cEnv;

  if (useC) {
    cEnv = new CEnvironment(columns, lines);
    cEnv.initializeEnv(initialConfig);
    nextState = cEnv.getNextState;
  } else if (window.Worker && useWorker) {
    nextState = splitJob(2);
  } else {
    nextState = getNextState;
  }

  render(state);

  return async function renderState () {
    if (useC) {
      state = await cEnv.getNextState();
    } else {
      state = await nextState(state, columns, lines);
    }
    render(state);
  }
};
