"use strict";
/*
///////////////////////////////////////
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true;
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// future reserved words
// const interface = 'Audio';
// const private = 534;


///////////////////////////////////////
// Functions
function logger() {
  console.log("My name is Radu");
}

// Calling / Running / Invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  // 'apples' and 'oranges' are called parameters
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0); // '5' and '0' are called arguments
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23");


///////////////////////////////////////
// Function Declarations vs. Expressions
// Function Declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1987);
console.log(age1);
// (Radu): or
// console.log(calcAge1(1987));

// Function Expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1997);
console.log(age2);
// (Radu): or
// console.log(calcAge2(1997));

console.log(age1, age2);

///////////////////////////////////////
// Arrow functions

const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(2007);
console.log(age3);
// (Radu): or
// console.log(calcAge3(2007));

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));


///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));


///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYear) {
  // we can use the same parameter (ex. "birthYear") for multiple functions
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement; // "return" outputs a value from the function & ends (and exits) the function so we must place everything else we need the function to do before "return"-ing it
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1; // -1 is a standard value used in programming (like 9999) to signal an output
  }
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));


///////////////////////////////////////
// Introduction to Arrays
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = "Jonas";
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);


///////////////////////////////////////
// Basic Array Operations (Methods)
const friends = ["Michael", "Steven", "Peter"];

// Add elements
const newLength = friends.push("Jay"); // ADDS "Jay" to the END of the "friends" array
console.log(friends);

console.log(newLength); // the result of "friends.push("Jay");" (stored in a variable called "const newLength") is the VALUE of the NEW LENGTH of the "friends" ARRAY aka "friends.length" (as seen below)
console.log(friends.length);
console.log(newLength === friends.length);

friends.unshift("John"); // ADDS "John" to the BEGINNING of the "friends" array and the result is also the VALUE of the NEW LENGTH of the "friends" ARRAY aka "friends.length" (5 in this case)
console.log(friends);

// Remove elements
friends.pop(); // REMOVES LAST element of the "friends" array
const popped = friends.pop(); // outputs the element that was removed, unlike the previous operations that added elemets to the array (Peter in this case because we used "friends.pop();" twice and removed "Jay" before this)
console.log(popped);
console.log(friends);

friends.shift(); // REMOVES FIRST element of the "friends" array ("John" in this case)
console.log(friends);

// Other Basic Array Operations (Methods)
console.log(friends.indexOf("Steven")); // RETURNS the POSITION of the VALUE "Steven" in the "friends" array (1 in this case)
console.log(friends.indexOf("Bob")); // (-1 in this case because "Bob" is NOT part of the "friends" array)

friends.push(23);
console.log(friends.includes("Steven")); // ES6 METHOD similar to "friends.indexOf" that RETURNS "true" or "false" values ("true" in this case)
console.log(friends.includes("Bob")); // ("false" in this case)
console.log(friends.includes(23)); // ("true" in this case)

// we can use the "friends.includes" ES6 METHOD to write conditionals (because it RETURNS "true" or "false" values)
if (friends.includes("Steven")) {
  console.log("You have a friend called Steven");
}


///////////////////////////////////////
// Introduction to Objects
const jonasArray = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
];

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};
console.log(jonas);

///////////////////////////////////////
// Dot vs. Bracket Notation
console.log(jonas.lastName); // we need to use the REAL property name, not a computed one
// or
console.log(jonas["lastName"]); // we can use a COMPUTED property name (an EXPRESSION) , see bellow

const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]);

// console.log(jonas.'last' + nameKey) // this will NOT work

const interestedIn = prompt(
  "What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends"
);
console.log(jonas[interestedIn]); // JavaScript will replace the "interestedIn" variable with the input we give in the prompt window and it will display the value of that property in the console (from the "jonas" OBJECT)

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, and friends"
  );
}

// Adding more Properties to an Object
jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman";
console.log(jonas);
// console.table(jonas);

// Challenge
// "Jonas has 3 friends and his best friend is called Michael"
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends and his best friend is called ${jonas.friends[0]}`
);


///////////////////////////////////////
// Object Methods
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },

  // OR BETTER !
  // calcAge: function () {
  //  // console.log(this);
  //   return 2037 - this.birthYear;
  // },

  // OR EVEN BETTER !!
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
};

// console.log(jonas.calcAge(1991));
// or
// console.log(jonas["calcAge"](1991));

// OR BETTER !
// console.log(jonas.calcAge());

// OR EVEN BETTER !!
// BUT YOU MUST RUN / CALL "console.log(jonas.calcAge());" ONCE before running / calling "console.log(jonas.age);" OR "jonas.calcAge();" TO actually CREATE the "age" PROPERTY in the "jonas" OBJECT, otherwise you will get the "undefined" error
jonas.calcAge();
// you can now display to the console once or as many times as needed (AFTER calling the OBJECT METHOD once)
console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);
*/

///////////////////////////////////////
// Iteration: The for Loop

// console.log('Lifting weights repetition 1');
// console.log('Lifting weights repetition 2');
// console.log('Lifting weights repetition 3');
// console.log('Lifting weights repetition 4');
// console.log('Lifting weights repetition 5');
// console.log('Lifting weights repetition 6');
// console.log('Lifting weights repetition 7');
// console.log('Lifting weights repetition 8');
// console.log('Lifting weights repetition 9');
// console.log('Lifting weights repetition 10');

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

///////////////////////////////////////
// Looping Arrays, Breaking and Continuing
const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];
const types = []; // creates an EMPTY array

// console.log(jonas[0])
// console.log(jonas[1])
// ...
// console.log(jonas[4])
// jonas[5] does NOT exist

for (let i = 0; i < jonas.length; i++) {
  // Reading from jonas array
  console.log(jonas[i], typeof jonas[i]);

  // Filling types array
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2022 - years[i]);
}
console.log(ages);

// continue and break
// continue = SKIP the current iteration
console.log("--- ONLY STRINGS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;

  console.log(jonas[i], typeof jonas[i]);
}

// break = EXIT the loop completely
console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;

  console.log(jonas[i], typeof jonas[i]);
}
