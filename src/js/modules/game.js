import { getNextState } from './environment'
import { getRender } from './render'

export function game(elm, columns, lines, initialConfig, useWorker) {
  let state = initialConfig,
    render = getRender(elm, columns, lines),
    worker = null,
    nextState;

  if (window.Worker && useWorker) {
    let promise,
        resolve;

    promise = new Promise.resolve(res => { resolve = res });
    worker = new Worker('env-worker.js');

    nextState = (state, columns, lines) => {
      worker.addEventListener('message', e => {
        resolve(e.data)
      });
      worker.postMessage(state);

      return promise;
    }
  } else {
    nextState = getNextState;
  }

  render(state);

  return async function renderState () {
    state = await nextState(state, columns, lines);
    render(state);
  }
};
