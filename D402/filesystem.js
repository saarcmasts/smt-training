import fs from 'fs';

// Synchronously read the content of README.md file
// const data = fs.readFileSync('./README.md', 'utf8');

// console.log('File content:');
// console.log(data);

// Asynchronously read the file
fs.readFile('./README.md', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('Asynchronous file content:');
  console.log(data);
});

console.log('This is displayed immediately after the readFile call.');