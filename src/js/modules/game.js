import { getNextState } from './environment';
import { splitJob } from './worker-dispacher';
import { getRender } from './render';

export function game(elm, columns, lines, initialConfig, useWorker) {
  let state = initialConfig,
    render = getRender(elm, columns, lines),
    nextState;

  if (window.Worker && useWorker) {
    nextState = splitJob(2);
  } else {
    nextState = getNextState;
  }

  render(state);

  return async function renderState () {
    state = await nextState(state, columns, lines);
    render(state);
  }
};
