/**
 *  In pure JavaScript, write a loop that outputs the names of the items
 *  in the following shopping list:
 */
const items = ["Apple", "Orange", "Milk", "Oat meal", "Pasta", "Yoghurt", "Chocolate", "Salad"];

// suggested solution: 1
for (const item of items) {
    console.log(item);
}

// suggested solution: 2
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(item);
}

// suggested solution: 3
items.forEach(item => console.log(item));

/**
 * Write a function called getUsers that loops through the following array
 * and outputs the name property and age based on the birthDate property of every user.
 * The output can be text, HTML or a console.log(...).
 */
const userArray = [
    { name: "Kasper", birthDate: "1988-07-05" },
    { name: "Søren", birthDate: "1982-02-03" },
    { name: "Rasmus", birthDate: "1990-03-12" }
];

function getUsers(users) {
    for (const user of users) {
        const today = new Date();
        const birthDate = new Date(user.birthDate);
        const diff = new Date(today - birthDate);
        const age = diff.getFullYear() - 1970;

        console.log(`${user.name}: ${age} years old`);
    }
}

getUsers(userArray);

/**
 * Write in pure JavaScript a function called shorterThanOrEqual(..., ...)
 * which takes two string parameters, returns true if the first one is shorter than or equal in length to the other,
 * returns false if the first one is longer than the other.
 */

// suggested solution: 1
function shorterThanOrEqual(a, b) {
    if (a.length <= b.length) {
        return true;
    } else {
        return false;
    }
}

console.log(shorterThanOrEqual("First String", "And this is the Second String"));
console.log(shorterThanOrEqual("This is the First String", "And Second String"));
console.log(shorterThanOrEqual("String", "String"));

// suggested solution: 2
function shorterThanOrEqualShort(a, b) {
    return a.length <= b.length;
}

console.log(shorterThanOrEqualShort("First String", "And this is the Second String"));
console.log(shorterThanOrEqualShort("This is the First String", "And Second String"));
console.log(shorterThanOrEqualShort("String", "String"));

// suggested solution: 3
const shorterThanOrEqualShortArrow = (a, b) => a.length <= b.length;

console.log(shorterThanOrEqualShortArrow("First String", "And this is the Second String"));
console.log(shorterThanOrEqualShortArrow("This is the First String", "And Second String"));
console.log(shorterThanOrEqualShortArrow("String", "String"));
