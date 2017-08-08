import { getWorker } from './worker-wrapper';

export function splitJob(workersNum = 1) {
  let workers = [];

  for (let i = 0; i < workersNum; i++) {
    workers.push(getWorker());
  }

  return function runJobs(state, columns, lines) {
    let size = columns * lines / workersNum,
      jobs = workers.map(function (run, i) {
        let limit = i < workersNum - 1? size * (i + 1) : columns * lines;
        return run([state, columns, lines, size * i, limit]);
      });

    return Promise.all(jobs).then(function (pieces) {
      let result = new Uint8Array(columns * lines),
        offset = 0;

      pieces.forEach(function (piece) {
        result.set(piece, offset);
        offset += piece.length;
      });

      return result;
    });
  }
}
