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

Modify the parameter passed to ```game``` function in ```app.js```:
- set the first parameter to true to enable web workers (not supported for c environment)
- set the second parameter to true to enable the c environment