import { CEnvironment } from './c/c_environment'
import { getRender } from './render'

export function game(elm, columns, lines, initialConfig) {
  let state = initialConfig,
    render = getRender(elm, columns, lines);

  render(state);

  let env = new CEnvironment(columns, lines);
  env.initializeEnv(initialConfig);

  return function renderState () {
    state = env.getNextState(state);
    render(state);
  }
};
