import WasmEngine from './wasmEngine'   
import { getNextState } from './environment'
import { getRender } from './render'


export function game(elm, columns, lines, initialConfig) {
  let state = initialConfig,
    render = getRender(elm, columns, lines);

  render(state);

  const wasmEngine = new WasmEngine(columns, lines);

  return function renderState () {
    state = wasmEngine.computeNextState(state);
    render(state);
  }
};