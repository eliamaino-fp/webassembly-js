const DEAD = 0;
const ALIVE = 1;
const MIN_COUNT = 2;
const MAX_COUNT = 3;

export function getNextState(currentState, width, height) {
  const bounds = createBounds(width, height);
  let index = 0,
    nextState = new Uint8Array(width*height),
    maxHeight = height - 1;

  for (let line = 0; line < height; line++) {
    for (let column = 0; column < width; column++) {
      nextState[index] = getCellStatus(
        currentState[index],
        getNeighboursCount(currentState, column, line, maxHeight, bounds)
      );

      index++;
    }
  }

  return nextState;
}

export function getNeighboursCount(currentState, column, line, height, bounds) {
  let previousLine = line === 0 ? height : line - 1,
      nextLine = line === height ? 0 : line + 1;

  return getLineCount(currentState, column, bounds[line])
    + getLineCount(currentState, column, bounds[nextLine])
    + getLineCount(currentState, column, bounds[previousLine])
    - currentState[bounds[line].left + column];
}

function getLineCount(currentState, column, bounds) {
  let offset = bounds.left + column;

  return currentState[offset]
    + currentState[offset === bounds.left ? bounds.right : offset - 1]
    + currentState[offset === bounds.right ? bounds.left : offset + 1];
}

export function createBounds(width, height) {
  let bounds = [], leftBound;

  for (let i = 0; i < height; i++) {
    leftBound = i * width;
    bounds.push({
      left: leftBound,
      right: leftBound + width - 1
    });
  }

  return bounds;
}

export function getCellStatus (status, neighboursCount) {
  switch (neighboursCount) {
    case MAX_COUNT:
      return ALIVE;
    case 2:
      return status;
    default:
      return DEAD;
  }
}
