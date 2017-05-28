import './environment'

export default class Game {
  constructor () {
    this.width = 0;
    this.height = 0;
    this.currentState = [];
    this.elm = null;
  }

  setup (elm, width, height, initialConfig) {
    this.width = width;
    this.height = height;
    this.elm = elm;

    if (!initialConfig) {
      this.currentState = this.createGameMatrix(width, height);
    } else {
      this.currentState = this.createGameSetupMatrix(initialConfig);
    }
    this.renderEnviroment(elm, this.currentState.slice());

    return this;
  }

  next () {
    this.currentState = environment.getNextState(this.currentState.slice());
    this.render(this.elm, this.currentState.slice());
  }

  createGameSetupMatrix(initialConfig) {
    return initialConfig.map(line => line.map(column => column ? ALIVE : DEAD));
  }

  createGameMatrix(width, height) {
    let gameMatrix = new Array(height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (gameMatrix[y] === undefined) {
          gameMatrix[y] = new Array(width);
        }

        gameMatrix[y][x] = Math.ceil(Math.random() * 1000) % 2 ? DEAD : ALIVE;
      }
    }

    return gameMatrix;
  }

  renderEnviroment (elm, state) {
    let visualState = elm;

    for (let y = 0; y < this.height; y++) {
      let row = visualState.insertRow(y);
      for (let x = 0; x < this.width; x++) {
        let cell = row.insertCell(x);
        cell.dataset.state = state[y][x];
      }
    }
  }

  render (elm, state) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        elm.rows[y].cells[x].dataset.state = state[y][x];
      }
    }
  }
}
