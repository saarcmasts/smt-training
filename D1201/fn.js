// Function binding & partial functions

const f = (a, b) => a + b;
const f2 = function(a, b) {
  return a + b;
};
const func = new Function('a', 'b', 'return a + b');

const user = {
    name: 'John',
    greet: function() {
        return `Hello, ${this.name}`;
    }
}

// console.log(func(1, 2));
// console.log(user.greet());

const boundGreet = user.greet.bind(user);

setTimeout(() => {
    console.log(boundGreet()); // Hello, John
}, 1000)

const partialF = f.bind(null, 1); // Partial application

// f(1, 2)
console.log(partialF(2));