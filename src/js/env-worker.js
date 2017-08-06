import { getNextState } from './modules/environment';

addEventListener('message', function(e) {
  let [currentState, width, height, offset, limit] = e.data;
  postMessage(getNextState(currentState, width, height, offset, limit));
});