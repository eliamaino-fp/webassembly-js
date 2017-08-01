Webassembly and javascript performance comparison

## To compile

run: 

```emcc src/js/c/environment.c -o src/js/c/environment.js```

then add ```export {Module as default}``` at the end of the file  ```src/js/c/environment.js```

then run ```webpack```