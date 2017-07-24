# Webassembly and javascript performance comparison

[Conwey's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) performance comparison using:
* Vanilla JS
* Web Assembly (C)

## Compile

To compile the project just run `webpack`

To compile the C engine to WASM you need [emscripten](https://github.com/kripken/emscripten)
After having installed it run:

`emcc environment.c -O1 -o ../js/wasm/environment.wasm -s WASM=1 -s SIDE_MODULE=1`
