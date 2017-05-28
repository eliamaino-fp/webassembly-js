import { getNextState } from './environment'

const stateData = [
  'dead-cell',
  'alive-cell'
];

export default class Game {
  constructor (elm, width, height, initialConfig) {
    this.width = width;
    this.height = height;
    this.currentState = initialConfig;
    this.elm = elm;
    this.renderEnviroment(elm, this.currentState.slice());
  }

  next () {
    this.currentState = getNextState(this.currentState.slice());
    this.render(this.elm, this.currentState.slice());
  }

  renderEnviroment (elm, state) {
    let visualState = elm;

    for (let y = 0; y < this.height; y++) {
      let row = visualState.insertRow(y);
      for (let x = 0; x < this.width; x++) {
        let cell = row.insertCell(x);
        cell.dataset.state = stateData[state[y][x]];
      }
    }
  }

  render (elm, state) {
    const size = this.height * this.width;

    let j = -1, x, y;
    for (let i = 0; i < size; i++) {
      x = (i % this.width) ? j : ++j;
      y = i % this.width;

      elm.rows[y].cells[x].dataset.state = stateData[state[y][x]];
    }
  }
}
