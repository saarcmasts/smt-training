import { spawn } from 'child_process';

const subProcess = spawn('ls', ['-lah']);

subProcess.stdout.on('data', (data) => {
    console.log(`Output:`);
    console.log(data);
});

subProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
});
