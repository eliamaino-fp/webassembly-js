import { getRender } from './render';

export function game(elm, columns, lines, initialConfig, strategy) {
  let state = initialConfig,
    render = getRender(elm, columns, lines),
    nextState = strategy;

  render(state);

  return async function renderState () {
    state = await nextState(state, columns, lines);
    render(state);
  }
};
