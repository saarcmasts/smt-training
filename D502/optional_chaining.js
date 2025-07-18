const student = {
  name: "John",
  age: 20,
  address: {
    street: "123 Main St",
    zip: "10001",
    city: false,
  }
};

console.log(student?.address?.city ?? "Unknown"); // Output: "Unknown"
console.log(student?.address?.city || "Unknown"); // Output: "Unknown"