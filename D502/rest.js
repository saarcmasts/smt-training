// spread
let arrOne = ['Apple', 'Banana', 'Cherry'];
let arrTwo = ['Date', 'Elderberry', 'Fig'];

arrOne = [...arrOne, 'Grape', 'Honeydew'];

console.log([...arrOne, ...arrTwo]);

// rest
function sum(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7)); // Outputs: 15