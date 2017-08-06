const SQUARE_SIZE = 1;

let offscreenCanvas = null,
    offscreenCanvasCtx = null,
    domCanvas = null,
    domCanvasCtx = null;

export function getRender(elm, columns, lines) {
  let width = columns * SQUARE_SIZE,
      height = lines * SQUARE_SIZE;

  // TODO: Figure out what was the bug behind this
  // offscreenCanvas = document.createElement('canvas');
  // offscreenCanvas.width = width;
  // offscreenCanvas.height = height;
  // offscreenCanvasCtx = offscreenCanvas.getContext('2d', { alpha: false });

  domCanvas = elm;
  domCanvas.mozOpaque = true;
  domCanvas.width = width;
  domCanvas.height = height;
  domCanvasCtx = domCanvas.getContext('2d', { alpha: false });

  return function renderCanvas (state) {
    render(state, width, height);
  }
}

function render (state, width, height) {
  let index = 0, i, j;
  domCanvasCtx.fillStyle = 'rgb(0, 114, 255)';
  domCanvasCtx.strokeStyle = 'rgb(0, 114, 255)';
  domCanvasCtx.clearRect(0, 0, width, height);

  for (i = 0; i < height; i += SQUARE_SIZE) {
    for (j = 0; j < width; j += SQUARE_SIZE) {
      if (state[index]) {
        domCanvasCtx.fillRect(j, i, SQUARE_SIZE, SQUARE_SIZE);
      }
      index++;
    }
  }

  // domCanvasCtx.drawImage(offscreenCanvas, 0, 0);
}
