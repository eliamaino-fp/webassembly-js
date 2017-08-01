import { getNextState, initializeEnv } from './c/c_environment'
import { getRender } from './render'

export function game(elm, columns, lines, initialConfig) {
  let state = initialConfig,
    render = getRender(elm, columns, lines);

  render(state);

  let memoryOffset = initializeEnv(initialConfig, columns, lines);

  return function renderState () {
    state = getNextState(state);
    render(state);
  }
};
