"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// 1. Simple Array METHODS:
///////////////
// 1.1. "anyArray.slice();"
// - EXTRACTS & RETURNS A PIECE / SLICE of an Array WITHOUT MUTATING the ORIGINAL Array
// - RETURNS A NEW ARRAY
let arr = ["a", "b", "c", "d", "e"];

// console.log(arr.slice(2)); // EXTRACTS & RETURNS the Array elements starting from position 2 until the end of the Array
// console.log(arr);

// console.log(arr.slice(2, 4)); // de la 2 (inclusiv) pana la 4 (fara 4)
// console.log(arr);

// console.log(arr.slice(-1)); // ultimul element
// console.log(arr.slice(-2)); // ultimele 2 elemente
// console.log(arr.slice(1, -2)); // de la 1 (inclusiv) la ultimele 2 (fara ele)
// console.log(arr);

// *** Using the ".slice();" Method to create a SHALLOW copy of an Array - just like Using the SPREAD Operator
// this:
// console.log(arr.slice()); // Using the ".slice();" Method
// is the SAME as this:
// console.log([...arr]); // Using the SPREAD Operator

///////////////
// 1.2. "anyArray.splice();"
// - REMOVES elements from an Array and RETURNS A MUTATED ARRAY
// - CHANGES / MUTATES THE ORIGINAL ARRAY

// console.log(arr.splice(2)); // REMOVES & RETURNS the Array elements starting from position 2 until the end of the Array
// console.log(arr.splice(-1)); // REMOVES & RETURNS the last element
// console.log(arr);

// *** Using the "deleteCount" parameter inside the ".splice();" Method
// console.log(arr.splice(0, 1)); // REMOVES & RETURNS 1 Array element starting from position 0
// console.log(arr);
// console.log(arr.splice(2, 2)); // REMOVES & RETURNS 2 Array elements starting from position 2
// console.log(arr);

// console.log(arr.splice(-1)); // ultimul element
// console.log(arr);
// console.log(arr.splice(-2)); // ultimele 2 elemente
// console.log(arr);

///////////////
// 1.3. "anyArray.reverse();"
// - REVERSES the elements of an Array and RETURNS A MUTATED ARRAY
// - CHANGES / MUTATES THE ORIGINAL ARRAY
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

/*
// EXTRA - Radu
// !!! HOW TO REVERSE A STRING USING A FUNCTION !!!
// V1 - DETAILED version
const reverseString = function (str) {
  const stringToArray = str.split(""); // Step 1: CONVERT the String to an Array
  const reverseArray = stringToArray.reverse(); // Step 2: REVERSE that Array
  const arrayBackToString = reverseArray.join(""); // Step 3: CONVERT the REVERSED Array BACK to a String
  console.log(arrayBackToString); // display to the console
  return arrayBackToString; // execute function
};

reverseString("string 123"); // CALL function
// console.log(reverseString("string 123")); // WITHOUT using "console.log(arrayToString);" inside the "reverseString" function
reverseString("123456789");
reverseString("this is just a test");
reverseString("tset a tsuj si siht");

// OR
// V2 - FASTER version
const reverseString2 = function (str) {
  const anyString = str.split("").reverse().join("");
  console.log(anyString);
  return anyString;
};

reverseString2("this is another test");
reverseString2("tset rehtona si siht");
reverseString2("9876543210");

// OR
// WITHOUT using a function:
console.log("WITHOUT using a function:".split("").reverse().join(""));
console.log("Any String".split("").reverse().join(""));
console.log("gnirtS ynA".split("").reverse().join(""));
*/

/*
///////////////
// !!! HOW TO HIDE / MASK LAST DIGITS OF A CREDIT CARD !!!
const maskCreditCard = function (number) {
  // const str = String(number); // converting a Number to a String
  // or
  const str = number + ""; // converting a Number to a String
  const last = str.slice(-3);
  // console.log(last);
  // console.log(number);
  const padded = last.padStart(str.length, "*");
  console.log(padded);
  return padded;
};

maskCreditCard(123456789);
maskCreditCard("123123");
*/

///////////////
// 1.4. "anyArray.concat();"
// - ADDS one or more Arrays to the current one
// - RETURNS A NEW ARRAY
const letters = arr.concat(arr2);
console.log(letters);
console.log(arr);
// SAME RESULT as using the SPREAD Operator:
console.log([...arr, ...arr2]);
// console.log(...arr, ...arr2);

///////////////
// 1.4. "anyArray.concat();"
console.log(letters);
console.log(letters.join(" - "));
console.log(letters);

/////////////////////////////////////////////////
// 2. The NEW ".at();" Method
// INDICATES THE POSITION / INDEX OF AN ELEMENT IN THE ARRAY
const arr3 = [23, 11, 64];
// this ...
console.log(arr3[0]); // arr3 at position 0
// ... is the SAME as this:
console.log(arr3.at(0)); // arr3 at position 0

// the BIG DEAL about using the NEW ".at();" Method is that we can use it to GET THE LAST ELEMENT of an Array FASTER, by WRITTING LESS CODE:
console.log(arr3.at(-1)); // THIS ...
console.log(arr3[arr3.length - 1]); // ... is the SAME as this ...
console.log(arr3.slice(-1)[0]); // ... is the SAME as this ...
console.log(...arr3.slice(-1)); // ... is the SAME as this :D

// IS PERFECT FOR METHOD CHAINING

// ALSO WORKS ON STRINGS
console.log("jonas".at(0));
console.log("jonas".at(-1));

/////////////////////////////////////////////////
// 3. Looping Arrays: the "forEach();" Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// *** Using the "for-of" Method:
console.log("---- FOR-OF ----");
// V1:
/*
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}.`);
  }
}
*/
// Or BETTER - V2:
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
// *** Using the "forEach();" Method:
// V1:
/*
console.log("---- FOREACH ----");
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}.`);
  }
});
// the "forEach();" Method is CALLING the "function(movement){}" CALLBACK function FOR EACH of the "movements" Array elements:
// (the "movement" parameter in the "function(movement){}" CALLBACK function === the current Array element):
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
*/
// Or BETTER - V2:
// movements.forEach(function (movement, index, array) {
movements.forEach(function (mov, i, arr) {
  // "mov" = "movement" = the Current Element of the Array
  // "i" = "index" = the Current Index of the Current Element of the Array
  //  "arr" = "array" = the ENTIRE Array
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
  // console.log(`Test of displaying the ENTIRE Array ${arr}`);
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
