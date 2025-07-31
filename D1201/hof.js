// Higher order Function
function sayHi(name) {
  return function() {
    console.log("Hi " + name);
  }
}

console.log(sayHi("Alice")()); // Output: Hi Alice

function arrEngine(arr, func) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(func(arr[i]));
    }
    return result;
}

console.log(arrEngine([1, 2, 3], (x) => x * 2));
console.log(arrEngine(['one', 'two', 'three'], (x) => x + '!'));

[1,2,3].map((x) => x * 2); // Output: [2, 4, 6]