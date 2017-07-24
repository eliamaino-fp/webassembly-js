import { getNextState } from './environment'
import { getRender } from './render'

export function game(elm, columns, lines, initialConfig) {
  let state = initialConfig,
    render = getRender(elm, columns, lines);

  render(state);

  return function renderState () {
    state = getNextState(state, columns, lines);
    render(state);
  }
};
