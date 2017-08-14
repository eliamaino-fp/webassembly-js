Webassembly and javascript performance comparison

## Requirements
- webpack
- npm
- [emscripten](https://github.com/kripken/emscripten)

## To compile

Run ```npm install```.

To compile the C environment to Javascript run: 

```emcc src/js/modules/c/environment.c -o src/js/modules/c/environment.js```

or for best performance:

```emcc src/js/modules/c/environment.c -o src/js/modules/c/environment.js -s NO_EXIT_RUNTIME=1 -O3 -Oz --memory-init-file 0```

then add ```export {Module as default}``` at the end of the file  ```src/js/c/environment.js```

then run ```webpack```

## To choose between C, Vanilla js and web workers

Modify the ```strategy``` constant passed to ```game``` function in ```app.js```, you can choose between:
- ```vanilla``` for simple Vanilla JS.
- ```workers``` for the Vanilla JS strategy which uses web workers to split the calculation in multiple threads.
- ```wasm``` for the strategy which uses C compiled functions to calculate the next state.