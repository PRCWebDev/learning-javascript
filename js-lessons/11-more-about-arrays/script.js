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

///////////////
// DOM Manipulation:
const displayMovements = function (movements) {
  // DOM Manipulation:
  // CLEARING / EMPTYING the "Movements" container:
  containerMovements.innerHTML = ""; // this REMOVES ALL previous entries

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // DOM Manipulation:
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

///////////////
// COMPUTING USERNAMES:
// 0. we want to CREATE the "username" = "stw" - an abbreviation of the "user" Variable:
// const user = "Steven Thomas Williams";

// 1. SETTING all the letters of the names to lower case
// 2. DIVIDING / SPLITTING the String into an Array with 3 elements ['steven', 'thomas', 'williams']
// const username = user.toLowerCase().split(" ");
// console.log(username); // ['steven', 'thomas', 'williams']

// 3. taking the FIRST Letter of each Array Elements and PUTTING / ADDING them in a NEW ARRAY
/*
const username = user
  .toLowerCase()
  .split(" ")
  .map(function (name) {
    return name[0];
  });
  */
// OR BETTER with Arrow Functions - MORE MODERN APPROACH:
/*
const username = user
  .toLowerCase()
  .split(" ")
  .map((name) => name[0]); // this CREATES a NEW Array ['s', 't', 'w'] WITHOUT MUTATING the Original "user" String
console.log(username); // ['s', 't', 'w']
*/

// 4. JOINING the New Array Elements in a NEW String
/*
const username = user
  .toLowerCase()
  .split(" ")
  .map((name) => name[0])
  .join("");
console.log(username); // "stw"
console.log(user); // the Original Array / String IS NOT MUTATED "Steven Thomas Williams"
*/

// 5. CREATING a function that can TRANSFORM any "user" into an abbreviated "username":
/*
const createUsernames = function (user) {
  const username = user
    .toLowerCase()
    .split(" ")
    .map((name) => name[0])
    .join("");
  return username;
};
console.log(createUsernames(account3.owner));
*/

// 6. COMPUTING one username FOR EACH of the account holders in our accounts Array (const accounts = [account1, account2, account3, account4];)
// we DO NOT want to create a new Array in this situation, all we want to do is to MODIFY the elements that ALREADY EXIST in the "accounts" Array = to MUTATE the Original "accounts" Array - SO WE USE the ".forEach();" Method for that:
// "accs" = "accounts" = the Entire "accounts" Array (#3)
// "acc" = "account" = the Current Element of the Array (#2)
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner // ADDING A NEW PROPERTY "username" to EACH of the "accounts" in the "accounts" Array (account1, account2, account3, account4)
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    // NO RETURN because what we're doing here is TO PRODUCE A SIDE EFFECT. So we are doing something to this "accounts" Object here (ADDING A NEW PROPERTY "username" to EACH of the "accounts" in the "accounts" Array (account1, account2, account3, account4)). And so there is NO NEED to return anything. We are just doing some work here, basically, we are NOT creating a new value to RETURN.
  });
};
createUsernames(accounts);
console.log(accounts); // (4) [{…}, {…}, {…}, {…}] 0: {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: "js"} IS THE SAME AS THIS (WITH the NEW PROPERTY "username" ADDED to the Original "account1/2/3/4" Object):
/*
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: "js",
};
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

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
// console.log(arr);
// console.log(arr.splice(-1)); // REMOVES & RETURNS the last element
// console.log(arr);

// *** Using the "deleteCount" parameter inside the ".splice();" Method
// "anyArrayName.splice(start, deleteCount);"
// console.log(arr.splice(0, 1)); // REMOVES & RETURNS 1 Array element starting from position 0
// console.log(arr);
// console.log(arr.splice(2, 2)); // REMOVES & RETURNS 2 Array elements starting from position 2
// console.log(arr);

// EXTRA - Radu
// *** Using the "deleteCount" parameter + the "insertItem" parameter inside the ".splice();" Method
// "anyArrayName.splice(start, deleteCount, insertItem1, insertItem2, ..., insertItemN);"
// arr.splice(0, 0, "f"); // REMOVES & RETURNS 0 Array element starting from Position 0 and ADDS the "f" Element
// console.log(arr);
// arr.splice(2, 1, "g", "h"); // REMOVES & RETURNS 1 Array element starting from Position 2 and ADDS the "g", "h" Elements
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
// - RETURNS A NEW ARRAY / DOES NOT MUTATE the Original Arrays
const moreItems = [1, 2, 3, 4, 5];
const letters = arr.concat(arr2, moreItems);
console.log(letters);
console.log(arr);
console.log(arr2);
// SAME RESULT as using the SPREAD Operator:
console.log([...arr, ...arr2]);
// console.log(...arr, ...arr2);

///////////////
// 1.5. "anyArray.join();"
console.log(letters);
console.log(letters.join(" - "));
console.log(letters);

///////////////
// 1.6. "anyArray.includes();"
// EXTRA - Radu
// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// 1.6.1. "anyArray.includes("searchElement");"
https: console.log(letters.includes(1)); // searchElement "1" // true
// 1.6.2. "anyArray.includes("searchElement", startingfromIndex );"
console.log(letters.includes(1, 2)); // searchElement "1" startingfromIndex "2" // true
console.log(letters.includes("a", 2)); // searchElement "a" starting fromIndex "2" // false

///////////////
// 1.7. The NEW ".at();" Method
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
console.log(arr3);
console.log(...arr3.slice(-1)); // ... is the SAME as this :D

// IS PERFECT FOR METHOD CHAINING

// ALSO WORKS ON STRINGS
console.log("jonas".at(0));
console.log("jonas".at(-1));

///////////////
// 1.8. Looping Arrays: the "forEach();" Method
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
// *** 1.8.1. Using the "forEach();" Method:
// V1:
console.log("---- FOREACH ----");
/*
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}.`);
  }
});
// the "forEach();" Method is CALLING the "function(movement){}" CALLBACK function FOR EACH of the "movements" Array elements:
// (the "movement" parameter in the "function(movement){}" CALLBACK function === the Current Element of the Array):
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
*/

// Or BETTER - V2:
// the "forEach();" Method is a Higher-Order Function that PASSES into the CALLBACK Function:
// *** 1. the Current Element of the Array (= "mov" = "movement")
// *** 2. the Current Index of the Current Element of the Array (= "i" = "index")
// *** 3. the ENTIRE Array that we are looping over (= "arr" = "array")
// !!! THE ORDER MATTERS !!!
// !!! The "continue" and "break" statements !!! DO NOT WORK !!! in the "forEach();" Method
// movements.forEach(function (movement, index, array) {
movements.forEach(function (mov, i, arr) {
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

///////////////
// 1.8.2. "forEach();" With Maps and Sets
// 1.8.2.1. "forEach();" With Maps
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
  // console.log(map);
});
// "value" = the Current Value of the Map
// "key" = the Current Key of the Current Value of the Array
// "map" = the ENTIRE Map

// 1.8.2.2. "forEach();" With Sets
// Sets DON'T have any Keys / Indexes so we use "_"(underscore) instead
// "map" = our Set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  // console.log(`${value}: ${value}`);
  console.log(`${_}: ${value}`);
  // console.log(map);
});

/////////////////////////////////////////////////
// 2. Data Transformations Methods: ".map();", ".filter();", ".reduce();"
// these are methods that we use to create new arrays based on transforming data from other arrays

///////////////
// 2.1. the ".map();" Method
const eurToUsd = 1.1;

// using the "for-of" loop:
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

//  using the ".map();" Method INSTEAD of the "for-of" loop is MORE INLINE with the Functional Programming Paradigm:
/*
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
  // return 23
});
*/
// !!! OR BETTER with Arrow Functions - MORE MODERN APPROACH - ALSO DAN SHIFU RECOMMENDS THIS APPROACH:
const movementsUSD = movements.map((mov) => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

// V1:
/*
const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});
*/

// OR EVEN BETTER V2 - using the Conditional Ternary Operator INSIDE the Arrow Function:
// !!! NO "{}" - OR IT DOESN'T WORK !!!
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

///////////////
// 2.2. the ".filter();" Method

///////////////
// 2.3. the ".reduce();" Method
