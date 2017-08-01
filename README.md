# Webassembly and javascript performance comparison

[Conwey's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) performance comparison using:
* Vanilla JS
* Web Assembly (C)

## Compile

To compile the project just run `webpack`

To compile the C engine to WASM you need [emscripten](https://github.com/kripken/emscripten)
After having installed it run:

`emcc src/c/engine.c -O3 -o src/js/wasm/engine.js -s WASM=1 -Wall -s MODULARIZE=1`
