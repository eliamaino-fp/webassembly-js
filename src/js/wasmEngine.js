import Module from './wasm/engine.js'

class WasmEngine {
  constructor (width, height) {
    this.wasm = true
    this.width = width
    this.height = height
    this.module = Module({wasmBinaryFile: 'wasm/engine.wasm'})
    window.module = this.module
  }

  computeNextState (state) {
    return this.module.asm._getNextState(state, this.width, this.height);
  }
}

export {WasmEngine as default}
