import { parentPort } from 'worker_threads';

let sum = 0;

for (let index = 0; index < 10000000000; index++) {
    sum += index;
}

parentPort.postMessage(`Worker initialized. Sum: ${sum}`);