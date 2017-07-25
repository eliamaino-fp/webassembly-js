import Module from './wasm/engine.js'  
module = Module({wasmBinaryFile: 'wasm/environment.wasm'})  
import { getNextState } from './environment'
import { getRender } from './render'

export function game(elm, columns, lines, initialConfig) {
  let state = initialConfig,
    render = getRender(elm, columns, lines);

  render(state);

  return function renderState () {
    state = module.asm._getNextState(state, columns, lines);
    render(state);
  }
};