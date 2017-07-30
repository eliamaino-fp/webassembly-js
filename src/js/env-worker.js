addEventListener('message', function(e) {
  console.info('worker :', e);
  postMessage(e.data);
});