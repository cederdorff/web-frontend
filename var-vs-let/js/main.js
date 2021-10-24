"use strict"; // to enable strict mode and modern JavaScript functionality

// “var” tolerates redeclarations
var user1 = "Pete";
var user1 = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error
console.log(user1); // John

let user2;
let user2; // SyntaxError: 'user' has already been declared


// “var” has no block scope

// Example 1
if (true) {
  var test1 = true; // use "var" instead of "let"
}
// true, the variable lives after if
// console.log(test1);

// Example 2
if (true) {
  let test2 = true; // use "let"
}

// Error: test is not defined
// console.log(test2);

// Example 3
for (var i = 0; i < 10; i++) {
  // ...
}
// 10, "i" is visible after loop, it's a global variable
// console.log(i);

// const is also block scoped

if (true) {
  const programmingLecturer = "RACE";
}
// console.log(programmingLecturer);




const myBirthday = "12-03-1990";
myBirthday = "12-03-1989";
// Uncaught TypeError: can't reassign the constant!

const person = {
  name: "Kasper",
  mail: "kato@eaaa.dk",
  age: 32
};

person.age = 33; // no error

person = {
  name: "Rasmus",
  mail: "race@eaaa.dk",
  age: 31
}; // Uncaught TypeError: can't reassign the constant!