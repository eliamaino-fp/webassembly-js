const DEAD = 'dead-cell';
const ALIVE = 'alive-cell';

const MIN_COUNT = 2;
const MAX_COUNT = 3;

let environment = Object.create({
  getNextState (currentStatus) {
    let rows = currentStatus.length,
      columns = currentStatus[0].length,
      nextState = new Array(rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (nextState[y] === undefined) {
          nextState[y] = new Array(columns);
        }

        let neighboursCount = this.getNeighboursCount(x, y, currentStatus.slice());

        nextState[y][x] = this.getCellStatus(
          currentStatus[y][x],
          neighboursCount
        );
      }
    }

    return nextState.slice();
  },

  getCellStatus (status, neighboursCount) {
    let returnStatus = DEAD;

    if (status === ALIVE) {
      if (neighboursCount < MIN_COUNT) {
        returnStatus = DEAD;
      } else if (neighboursCount <= MAX_COUNT) {
        returnStatus = ALIVE;
      } else {
        returnStatus = DEAD;
      }
    } else if (neighboursCount === MAX_COUNT) {
      returnStatus = ALIVE;
    }

    return returnStatus;
  },

  getNeighboursCount(x, y, currentStatus) {
    return this.getNeighbours(x, y, currentStatus.slice()).filter(status => status === ALIVE).length;
  },

  getNeighbours (x, y, matrix) {
    let rows = matrix.length,
      columns = matrix[0].length,
      neighbours = [];

    for (let i = y - 1; i <= y + 1; i++) {
      if (i >= 0 && i < rows) {
        for (let j = x - 1; j <= x + 1; j++) {
          if (j >= 0 && j < columns) {
            if(x != j || y != i) neighbours.push(matrix[i][j]);
          }
        }
      }
    }

    return neighbours;
  }
});
