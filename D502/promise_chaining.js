const sum = (a, b) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const result = a + b;
        resolve(result);
    }, 1000);
});

sum(5, 10)
    .then(result => {
        console.log(`Result from main: ${result}`);
        return result * 2;
    })
    .then(result => {
        console.log(`Result from second: ${result}`);
        return result * 2;
    })
    .then(result => {
        console.log(`Result from third: ${result}`);
    })
    .catch(error => {
        console.error(`Error occurred: ${error}`);
    });