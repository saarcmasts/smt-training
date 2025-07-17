// const sum = (a, b) => new Promise((resolve, reject) => {
//     resolve(a + b);
// });

// const subtract = (a, b) => new Promise((resolve, reject) => {
//     resolve(a - b);
// });

function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(a + b);
            reject(new Error('An error occurred while calculating the sum'));
        }, 3000);
    });
}

function subtract(a, b) {
    return new Promise((resolve, reject) => {
        resolve(a - b);
    });
}

// function main() {
//     sum(1, 2).then(r => {
//         console.log('Sum:', r);
//     });

//     subtract(5, 3).then(r => {
//         console.log('Difference:', r);
//     });
// }

async function main() {
    try {
        const sumResult = await sum(1, 2);
        console.log('Sum:', sumResult);
    } catch (error) {
        console.error('Error:', error.message);
    }

    const subtractResult = await subtract(5, 3);
    console.log('Difference:', subtractResult);
}

main();