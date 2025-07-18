import { Worker } from 'node:worker_threads';

const worker = new Worker('./worker.js');

worker.on('message', (message) => {
    console.log(`Received from worker: ${message}`);
});

console.log('Worker thread is running... This code is not blocked');