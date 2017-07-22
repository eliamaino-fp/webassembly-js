import { getNextState } from './environment'

const stateData = [
  'dead-cell',
  'alive-cell'
];

export default class Game {
  constructor (elm, width, height, initialConfig) {
    this.width = width;
    this.height = height;
    this.lenght = height * width;
    this.currentState = initialConfig;
    this.elm = elm;
    this.render(elm, this.currentState);
  }

  next () {
    this.currentState = getNextState(this.currentState, this.width, this.height);
    this.render(this.elm, this.currentState);
  }

  render (elm, state) {
    // console.clear();
    // console.info(state);
    // const size = this.height * this.width;
    //
    // let j = -1, x, y;
    // for (let i = 0; i < size; i++) {
    //   x = (i % this.width) ? j : ++j;
    //   y = i % this.width;
    //
    //   elm.rows[y].cells[x].dataset.state = stateData[state[y][x]];
    // }
  }
}
