export function getWorker() {
  let resolve,
    worker = new Worker('env-worker.js');

  worker.addEventListener('message', function(e) {
    resolve(e.data);
  });

  return function run (params) {
    return new Promise(function (res) {
      resolve = res;
      worker.postMessage(params);
    });
  }
}