// Find a power of a number using itterative approach
// function power(base, exponent) {
//   let result = 1;
//   for (let i = 0; i < exponent; i++) {
//     result *= base;
//   }
  
//   return result;
// }

// console.log(power(2, 3)); // Output: 8

// Find a power of a number using recursive approach
function power(base, exponent) {
  if (exponent === 0) {
    return 1;
  }
  return base * power(base, exponent - 1);
}