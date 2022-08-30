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

//////////////////////////////////////////////////////////////////////////////////////////////////
// DOM Manipulation:
// EDITED TO WORK INSIDE THE SORTING FUNCTION:
/*
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
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements); // EDITED & MOVED INSIDE THE LOGIN FUNCTION
// console.log(containerMovements.innerHTML);
*/
const displayMovements = function (movements, sort = false) {
  // ADDED a SECOND Parameter for the Sorting Function to work and SETTING its Default value to "false" because we want to show the "movements" in the exact order in which they are performed / appear in the Array
  // DOM Manipulation:
  // CLEARING / EMPTYING the "Movements" container:
  containerMovements.innerHTML = ""; // this REMOVES ALL previous entries

  // EDITED TO WORK INSIDE THE SORTING FUNCTION:
  const sortingMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  // we are using the ".slice();" Method to CREATE A SHALLOW COPY of the underlying "movements" Array because we DO NOT WANT TO MUTATE the Original "movements" Array
  // we are SORTING the "movements" Array in an Ascending Order (a - b) because we are Displaying the movements with the latest on top so we want to actually have them Displayed in a Descending Order, from the biggest movement to the smallest

  // EDITED TO WORK INSIDE THE SORTING FUNCTION:
  sortingMovements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // DOM Manipulation:
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements); // EDITED & MOVED INSIDE THE LOGIN FUNCTION
// console.log(containerMovements.innerHTML);

// EDITED TO WORK INSIDE THE MONEY TRANSFERS FUNCTION because we want to dynamically use the BALANCE depending on the CURRENT USER
/*
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);

  // DOM Manipulation:
  labelBalance.textContent = `${balance} €`;
};
// calcDisplayBalance(account1.movements); // EDITED & MOVED INSIDE THE LOGIN FUNCTION
*/
const calcDisplayBalance = function (acc) {
  // ADDING A NEW PROPERTY "balance" to EACH of the "accounts" in the "accounts" Array (account1, account2, account3, account4)
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // DOM Manipulation:
  labelBalance.textContent = `${acc.balance} €`;
};

// EDITED TO WORK INSIDE THE LOGIN FUNCTION because we want to dynamically use the INTEREST RATES depending on the CURRENT USER
/*
const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // DOM Manipulation:
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // DOM Manipulation:
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // the bank only pays an "interest" if the deposit is 1 euro or above
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // DOM Manipulation:
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements); // EDITED & MOVED INSIDE THE LOGIN FUNCTION
*/
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // DOM Manipulation:
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // DOM Manipulation:
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // the bank only pays an "interest" if the deposit is 1 euro or above
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // DOM Manipulation:
  labelSumInterest.textContent = `${interest}€`;
};

//////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing Login:
// REFACTORING CODE FOR BEST PRACTICE - Update UI:
const updateUI = function (acc) {
  // *** 3.3.2. Display the Movements:
  displayMovements(acc.movements);
  // *** 3.3.3. Display the Balance:
  calcDisplayBalance(acc);
  // *** 3.3.4. Display the Summary:
  calcDisplaySummary(acc);
};

let currentAccount; // defining this variable OUTSIDE of the function because we will need this information about the current account also later in other functions.
// ADDING the Event handler:
btnLogin.addEventListener("click", function (e) {
  // *** 1. Prevent form from submitting / reloading the page:
  // in HTML, the default behavior, when we click the Submit button, is for the page to reload. So we need to stop that from happening by CALLING the "preventDefault();" on that event ("e"):
  e.preventDefault();
  console.log("LOGIN #1");

  // *** 2. to LOG the user actually IN, we need to find the account from the accounts array, with the username that the user inputted:
  // this variable needs to be defined OUTSIDE of this function because we will need this information about the current account also later in other functions:
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // *** 3. Checking if the PIN (aka the password) is correct:
  // *** 3.1. we need to CONVERT the "input" THAT WILL ALWAYS BE A STRING to a number:
  // *** 3.2. we also need to Check if the account actually EXIST and the BEST WAY to do this is to use the OPTIONAL CHAINING Operator(?.):
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("LOGIN #2");

    // *** 3.3. if the account actually EXISTS, we need to:
    // DOM Manipulation:
    // *** 3.3.1. Display the UI and the Welcome message:
    // *** 3.3.1.1. Clearing the "input" fields:
    inputLoginUsername.value = inputLoginPin.value = ""; // this WORKS because the ASSIGNMENT Operator("=") WORKS from RIGHT to LEFT => we ASSIGN the empty string "" to "inputLoginPin" FIRST, which becomes an empty string "", AND ONLY AFTER THAT, the empty string "" is ASSIGNED to "inputLoginUsername",  which ALSO NOW becomes an empty string ""
    // *** 3.3.1.2. Removing the "focus" blinking dash by applying the ".blur();" Method:
    inputLoginPin.blur();
    // *** 3.3.1.3. Manipulating the DOM so we can set the opacity from 0 to 100 and Display the UI:
    containerApp.style.opacity = 100;
    // *** 3.3.1.4. Manipulating the DOM so we can Display the Welcome message:
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(" ")
      .at(0)}`; // OR "${currentAccount.owner.split(" ")[0]}" to get ONLY the FIRST name of the account owner

    // REFACTORING CODE FOR BEST PRACTICE - Update UI:
    /*
    // *** 3.3.2. Display the Movements:
    displayMovements(currentAccount.movements);

    // *** 3.3.3. Display the Balance:
    calcDisplayBalance(currentAccount);

    // *** 3.3.4. Display the Summary:
    calcDisplaySummary(currentAccount);
    */
    updateUI(currentAccount);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing Money Transfers:
// ADDING the Event handler:
btnTransfer.addEventListener("click", function (e) {
  // *** 1. Prevent form from submitting / reloading the page:
  e.preventDefault();

  // *** 2. Defining the Amount to transfer and the Receiver of the transfer:
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  // *** 3. Checking for transfer conditions:
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    console.log(`Transfer valid: ${amount} €`);
    // *** 4. Adding a NEW WITHDRAWAL to the user that performed the transfer:
    currentAccount.movements.push(-amount);

    // *** 5. Adding a NEW DEPOSIT to the user that received the transfer:
    receiverAcc.movements.push(amount);

    // *** 6. REFACTORING CODE FOR BEST PRACTICE - Update UI:
    updateUI(currentAccount);
  }

  // *** 7. Clearing the "input" Money Transfers fields:
  inputTransferTo.value = inputTransferAmount.value = "";
  // *** 8. Removing the "focus" blinking dash by applying the ".blur();" Method - OPTIONAL:
  // inputTransferAmount.blur();
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing the "Request loan" feature:
// our bank has a rule which says that it only grants a loan if there is at least one deposit with at least 10% of the requested loan amount
// ADDING the Event handler:
btnLoan.addEventListener("click", function (e) {
  // *** 1. Prevent form from submitting / reloading the page:
  e.preventDefault();
  console.log("Request loan");

  // *** 2. CONVERTING the requested loan amount from a STRING to a Number:
  const amount = Number(inputLoanAmount.value);

  // *** 3. Checking for loan conditions (at least one deposit with at least 10% of the requested loan amount):
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // *** 4. Adding a NEW DEPOSIT to the user that REQUESTED the loan:
    currentAccount.movements.push(amount);

    // *** 5. REFACTORING CODE FOR BEST PRACTICE - Update UI:
    updateUI(currentAccount);
  }

  // *** 6. Clearing the "input" Request loan fields:
  inputLoanAmount.value = "";
  // *** 7. Removing the "focus" blinking dash by applying the ".blur();" Method - OPTIONAL:
  inputLoanAmount.blur();

  console.log(amount);
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing the "Close account" feature:
// ADDING the Event handler:
btnClose.addEventListener("click", function (e) {
  // *** 1. Prevent form from submitting / reloading the page:
  e.preventDefault();
  console.log("Delete account");

  // *** 2. Checking if the credentials (the username and the pin) are correct:
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // *** 3. Finding the INDEX of the Current Account:
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // *** 4. Removing / DELETING the Current Account from the "accounts" Array:
    accounts.splice(index, 1);

    // *** 5. Manipulating the DOM so we can set the opacity from 100 to 0 and HIDE the UI:
    containerApp.style.opacity = 0;

    // *** 6. Clearing the "input" Close account fields:
    inputCloseUsername.value = inputClosePin.value = "";

    // *** 7. Removing the "focus" blinking dash by applying the ".blur();" Method - OPTIONAL:
    inputClosePin.blur();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Implementing the SORTING feature:
// Defining the "sorted" variable OUTSIDE of the Sorting function because we will also need this in other functions (ex. in the "displayMovements" function):
let sorted = false; // SETTING the Initial State
// ADDING the Event handler:
btnSort.addEventListener("click", function (e) {
  // *** 1. Prevent form from submitting / reloading the page:
  e.preventDefault();
  console.log("Sort movements");
  // displayMovements(currentAccount.movements, true);
  displayMovements(currentAccount.movements, !sorted); // CHANGING the STATE of the "sorted" variable (from "false" to "true") each time we click the "Sort" button
  sorted = !sorted; // CHANGING BACK the STATE of the "sorted" variable (from "true" to "false") each time we click the "Sort" button
});

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
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
// RETURNS a NEW Array containing the Results of Applying an Operation (a CALLBACK Function) on ALL Original Array Elements
// OR
// CALLS a defined CALLBACK Function on EACH Element of an Array, and RETURNS an Array that contains the Results.
// just like the "forEach();" Method, the ".map();" Method is a Higher-Order Function that PASSES into the CALLBACK Function:
// *** 1. the Current Element of the Array (= "mov" = "movement")
// *** 2. the Current Index of the Current Element of the Array (= "i" = "index")
// *** 3. the ENTIRE Array that we are looping over (= "arr" = "array")
// !!! THE ORDER MATTERS !!!
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
// RETURNS a NEW Array containing the Array Elements that PASSED a specified test CONDITION
// OR
// RETURNS the Elements of an Array that meet the CONDITION specified in a CALLBACK Function
// just like the "forEach();" and the ".map();" Methods, the ".filter();" Method is a Higher-Order Function that PASSES into the CALLBACK Function:
// *** 1. the Current Element of the Array (= "mov" = "movement")
// *** 2. the Current Index of the Current Element of the Array (= "i" = "index")
// *** 3. the ENTIRE Array that we are looping over (= "arr" = "array")
// !!! THE ORDER MATTERS !!!
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

//  using the "for-of" loop Method
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// BEST version - using Arrrow Functions:
const withdrawals = movements.filter((mov) => mov <= 0);
console.log(withdrawals);
console.log(movements);

///////////////
// 2.3. the ".reduce();" Method
// just like the "forEach();" and the ".map();" Methods, the ".filter();" Method is ALSO a Higher-Order Function
// !!! BUT it has ACCESS to 4 Parameters that it will PASS into the CALLBACK Function:
// *** 1. the ACCUMULATOR, which is like a SNOWBALL and, in EACH ITERATION, it will RETURN an UPDATED ACCUMULATOR (= "acc" = "accumulator")
// *** 2. the Current Element of the Array (= "mov" = "movement")
// *** 3. the Current Index of the Current Element of the Array (= "i" = "index")
// *** 4. the ENTIRE Array that we are looping over (= "arr" = "array")
// !!! THE ORDER MATTERS !!!

// !!! another DIFFERENCE is that the ".reduce();" Method HAS 2 PARAMETERS !!!:
// *** 1. the CALLBACK Function
// *** 2. the INITIAL VALUE of the ACCUMULATOR
// "anyArrayName.reduce(function (acc, mov, i, arr) {...}, initialAcc);"

// the ".reduce();" Method BOILS / REDUCES ALL Array Elements down to ONE SINGLE VALUE (ex: adding all array elements together)
/*
const balance = movements.reduce(function (acc, mov, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + mov;
}, 0);
*/

//  using the "for-of" loop Method
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// BEST version - using Arrrow Functions:
const balance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance);

// GETTING the Maximum Value from an Array
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements.at(0));
console.log(maxValue);

///////////////
// 2.4. CHAINING METHODS - CHAINING ALL the Data Transformations Methods: ".map();", ".filter();", ".reduce();" together
// Write a Function that CONVERTS all the Deposits from euros to usds and Adds them all up
const totalDepositsUSD = function (movements) {
  const totalDeposits = movements
    .filter((mov) => mov >= 0)
    .map((mov) => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(totalDeposits);
  return totalDeposits;
};
totalDepositsUSD(movements);

/////////////////////////////////////////////////
// 3. MORE Array Methods
///////////////
// 3.1. the ".find();" Method
// it is used to RETRIEVE ONLY the FIRST Element of an Array that SATISFIES a given CONDITION
// UNLIKE the ".filter();" Method, it RETURNS ONLY the Value of the Array Element, NOT an Entire NEW Array
// is ALSO BEST WRITTEN using Arrow Functions:
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal); // "-400" = the Value of the FIRST Element that SATISFIES the given CONDITION

console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

///////////////
// 3.2. the ".findIndex();" Method
// it RETURNS the INDEX of the FIRST Element of an Array that SATISFIES a given CONDITION
console.log(movements);
const firstWithdrawalIndex = movements.findIndex((mov) => mov < 0);
console.log(firstWithdrawalIndex);

///////////////
// 3.3. the ".some();" Method
// it's similar to the ".includes();" Method, BUT it CHECKS if ANY Element of the Array SATISFIES a given CONDITION
// !!! the word "ANY" => USE the "some();" Method !!!
console.log(movements);
// EQUALITY
console.log(movements.includes(-130));
// SOME: CONDITION
console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 5000);
console.log(anyDeposits);

///////////////
// 3.4. the ".every();" Method
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// VERY IMPORTANT AND COOL FEATURE:
// we CAN WRITE the Callback Function SEPARATELY (as a STAND-ALONE Arrow Function) AND THEN PASS it into DIFFERENT Array Methods as an Argument:
console.log("--- VERY IMPORTANT AND COOL FEATURE: ---");
const deposit = (mov) => mov > 0; // a STAND-ALONE Arrow Function
console.log(movements.some(deposit)); // PASSING the STAND-ALONE Arrow Function as an Argument of an Array Method // true
console.log(movements.every(deposit)); // PASSING the STAND-ALONE Arrow Function as an Argument of an Array Method // false
console.log(movements.filter(deposit)); // PASSING the STAND-ALONE Arrow Function as an Argument of an Array Method // (5) [200, 450, 3000, 70, 1300]
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

///////////////
// 3.5. the ".flat();" Method
// it RETURNS a NEW Array containing ALL the Elements that WERE PREVIOUSLY NESTED in the Array
// it can go MULTIPLE LEVELS DEEP, so we need to SPECIFY the DEPTH LEVEL anytime we have more than 1 Level Deep Array(s)
// it DOES NOT use a Callback Function

// Default = 1 Level Deep
const arrFlat1 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrFlat1.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// 2 Level Deep
const arrFlat2 = [
  [[1, 2], 3],
  [4, [5, 6], 7, 8],
];
console.log(arrFlat2.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

// "Infinity" Level Deep OR when we are too lazy to count how many levels we have ;)
const arrFlatInfinity = [1, 2, [3, 4, [5, 6, [7, 8, [9, [10]]]]]];
console.log(arrFlatInfinity.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(arrFlat2.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8]

///////////////
// 3.6. the ".flatMap();" Method
// it COMBINES the ".map();" Method (FIRST) and the ".flat();" Method (SECOND) together
// is the SAME as CHAIN Linking those 2 Methods "anyArrayName.map().flat();"
// the ".flat();" Method in the ".flatMap();" Method is REDUCED to the Default Level (1 Level Deep) and that CANNOT BE CHANGED
// it RETURNS a NEW Array
const accountsMovements = accounts.map((acc) => acc.movements);
console.log(accountsMovements);

// THIS:
// CHAIN Linking the ".map();" Method (FIRST) and the ".flat();" Method (SECOND) together:
const allMovements = accounts.map((acc) => acc.movements).flat();
console.log(allMovements);
// IS THE SAME AS THIS:
// using the ".flatMap();" Method:
const allMovementsFlatMap = accounts.flatMap((acc) => acc.movements);
console.log(allMovementsFlatMap);

const overallBalance = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
// OR
const overallBalance2 = allMovementsFlatMap.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance, overallBalance2);

///////////////
// 3.7.  the ".sort();" Method
// it MUTATES the Original Array
// the Default Sort Order is Ascending
// the ".sort();" Method CONVERTS the Elements of the Array into STRINGS and then COMPARES them and SORTS them

// 3.7.1. SORTING Strings
// 3.7.1.1. SORTING Strings Ascending
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach'] // ONLY WORKS with the Default Sort Order = Ascending
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach']
// THIS ALSO WORKS for SORTING Strings Ascending - using Arrow Functions:
owners.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(owners);
// OR BETTER:
console.log(owners.sort((a, b) => a - b)); // THIS ALSO WORKS

// 3.7.1.2. SORTING Strings Descending
owners.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(owners);
// console.log(owners.sort((a, b) => b - a)); // THIS DOES NOT WORK

// 3.7.2. SORTING Numbers
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70] // the ".sort();" Method CONVERTS the Elements of the Array into STRINGS and then COMPARES them and SORTS them

// return < 0, A, B (keep order) ??
// return > 0, B, A (switch order) ??

// 3.7.2.1. SORTING Numbers Ascending - using Arrow Functions
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]
// OR BETTER:
movements.sort((a, b) => a - b);
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// 3.7.2.2. SORTING Numbers Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);
// OR BETTER - using Arrow Functions
movements.sort((a, b) => b - a);
console.log(movements);

///////////////
// 3.8. the ".fill();" Method:
// More Ways of CREATING Arrays:
// *** 1. the Normal way:
const arrNew = [1, 2, 3, 4, 5, 6, 7];
// using the Array CONSTRUCTOR:
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); // [1, 2, 3, 4, 5, 6, 7]

// *** 2. CREATING NEW Empty Array + the ".fill();" Method:
const x = new Array(7); // 7 = the NUMBER of Elements in the Array, NOT an Element with the Value = 7
console.log(x); // (7) [empty × 7] // this DOES NOT WORK
console.log(x.map(() => 5)); // (7) [empty × 7] // also this DOES NOT WORK
// !!! THE ONLY WAY TO MALE IT WORK is to USE the Array CONSTRUCTOR TOGETHER WITH the ".fill();" Method:
x.fill(1, 3); // FILL the Array with "1" STARTING FROM Position 3 (inclusiv 3) UNTIL THE END of the Array
console.log(x); // (7) [empty × 3, 1, 1, 1, 1]

x.fill(2, 3, 5); // FILL the Array with "2" STARTING FROM Position 3 (inclusiv 3) UNTIL Position 5 (fara 5!) - DOAR Pozitiile 3 si 4 (fara 5!) // (7) [empty × 3, 2, 2, 1, 1]
console.log(x);

x.fill(3); // FILL the ENTIRE Array with "3"
console.log(x); // (7) [2, 2, 2, 2, 2, 2, 2]

arrNew.fill(23, 2, 6); // FILL the "arrNew" Array with "23" STARTING FROM Position 2 (inclusiv 2) UNTIL Position 6 (fara 6!) - DOAR Pozitiile 2, 3, 4 si 5 - PRACTIC INLOCUIESTE VALORILE de la Pozitiile 2 la 5 (fara 6!)
console.log(arrNew);
// !!! the ".fill();" Method MUTATES the Original Array !!!
// !!! WE CAN also CHAIN LINK the Array CONSTRUCTOR TOGETHER WITH the ".fill();" Method
const arrNewFill = new Array(5).fill("xyz"); // CREATES a NEW Array and FILLS it ENTIRELY with "xyz"
console.log(arrNewFill); // (5) ['xyz', 'xyz', 'xyz', 'xyz', 'xyz']

// *** 3. using Array CONSTRUCTOR + the "Array.from();" Method:
///////////////
// 3.9. the Array CONSTRUCTOR + the "Array.from();" Method:
// Using an arrow function as the map function to manipulate the elements and CREATE a NEW Array FILLED with 7 Elements ALL having the Value of "1" - similar to CREATING NEW Empty Array + the ".fill();" Method
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]

// !!! CREATE / GENERATE a SEQUENCE OF NUMBERS:
// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1); // CREATE a NEW Array FILLED with 7 Elements that represent a SEQUENCE OF NUMBERS // using the THROW-AWAY Variable "_"(underscore) INSTEAD of "cur" because we don't need the "cur" value at all, but we have to define something as the first Parameter
console.log(z); //(7) [1, 2, 3, 4, 5, 6, 7]
const w = Array.from({ length: 10 }, (_, i) => i * 2);
console.log(w); // (10) [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

// !!! WE CAN USE the Array CONSTRUCTOR + the "Array.from();" Method FOR SOOOO MUCH MORE THAN EXPLAINED IN THIS LECTURE - SEE MDN DOCS @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from :
// "The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object."
// *** Array from a String
console.log(Array.from("foo")); // [ "f", "o", "o" ]

// *** Array from a Set
const set = new Set(["foo", "bar", "baz", "foo"]);
console.log(Array.from(set)); // [ "foo", "bar", "baz" ]

// *** Array from a Map
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
console.log(Array.from(map)); // [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
console.log(Array.from(mapper.keys())); // ['1', '2'];
console.log(Array.from(mapper.values())); // ['a', 'b'];

// CHALLENGE - GENERATE 100 RANDOM dice rolls:
// WRITE A FUNCTION that generates 100 RANDOM dice rolls
let diceRoll;
const diceRolls = function () {
  const randomDiceRolls100 = Array.from({ length: 100 }, (diceRoll, i) => {
    // console.log(`Dice roll #${i + 1}:`);
    diceRoll = Math.trunc(Math.random() * 6) + 1;
    // console.log(`Dice rolls a ${diceRoll}`);
    return diceRoll;
  });

  // display the array
  console.log(randomDiceRolls100);

  // display the dice rolls in order
  console.log(`Dice rolls a ${randomDiceRolls100.join(" Dice rolls a ")}`);
  // OR
  // randomDiceRolls100.forEach(function (el, i, arr) {
  //   console.log(`Dice roll #${i + 1}: Dice rolls a ${el}`);
  // });

  return randomDiceRolls100;
};
diceRolls();

// *** Array from a NodeList: ... SEE MDN DOCS ... + Jonas Bankist app:
// using the "document.querySelectorAll(".anyClass")" RETURNS a NodeList, which is something LIKE an Array and CONTAINS ALL Selected DOM Elements
// a NodeList is NOT a REAL Array and it DOES NOT HAVE METHODS like ".map();" or ".reduce();"
// if we want to use Array Methods on a NodeList, we first need to CONVERT the NodeList to an Array using the Array CONSTRUCTOR + the "Array.from();" Method AND we can ALSO USE the "map" Function to CONVERT the Selected DOM Elements into Numbers
// we first ADD the Event handler Function so that every time we click on the "Balance" Label, we RETRIEVE / GET the Selected DOM Elements:
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI); // (8) [1300, 70, -130, -650, 3000, -400, 450, 200]

  // OR
  // we can also use the SPREAD Operator CONVERT the NodeList to an Array, BUT we will have to do the "mapping" separately
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
  console.log(
    movementsUI2.map((el) => Number(el.textContent.replace("€", ""))) // (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// EXTRA - RADU - Array Methods SUMMARY - which Array Method to use?? I want to... :
/*
// CREATE a NEW SHALLOW COPY of an Array:
const originalArray = [1, 2, 3, 4, 5, 0, 1, 2];
console.log(originalArray);

console.log(originalArray.slice(), originalArray);
console.log(Array.from(originalArray), originalArray);
console.log(
  originalArray.map((el) => el),
  originalArray
);
console.log([...originalArray], originalArray); // using the SPREAD Operator

// FIND OUT the LENGTH of an Array:
console.log(originalArray.length); // 8 - it's a PROPERTY, NOT A METHOD, but still... I want it here ;)

// FIND the INDEX of an Element in the Array:
// *** WITHOUT a CONDITION:
console.log(originalArray.indexOf(1)); // 0 - is counting from the START
console.log(originalArray.indexOf(1, -1)); // -1 // DOES NOT WORK, USE "..lastIndexOf()" INSTEAD

console.log(originalArray.lastIndexOf(1)); // 6 - is counting from the START
console.log(originalArray.lastIndexOf(1, 3)); // 0 - is counting from the END
// *** WITH a CONDITION:
console.log(originalArray.findIndex((el) => el > 2 && el < 4)); // 2 (the "el" = 3, which has an the Index of 2)

// FIND the Element of an Array BASED on the Index of that Element:
console.log(originalArray.at(0)); // "1"
console.log(originalArray[0]); // "1" - NOT A METHOD, but still... I want it here ;)

console.log(originalArray[-1]); // "undefined" - DOES NOT WORK, USE .at(-1) INSTEAD
console.log(originalArray.at(-1)); // "2"
// OR
console.log(originalArray.slice(-1)[0]);
// OR
console.log(...originalArray.slice(-1));
// OR
console.log(originalArray[originalArray.length - 1]);

// ADD Elements to Original Array... :
// *** it MUTATES the Original Array:
// *** ... AT the END of the Array:
console.log(originalArray.push("end")); // 9 - it RETURNS the NEW LENGTH of the Array
console.log(originalArray); // (9) [1, 2, 3, 4, 5, 0, 1, 2, 'end']

// *** ... AT the START of the Array:
console.log(originalArray.unshift("start")); // 10 - it RETURNS the NEW LENGTH of the Array
console.log(originalArray); // (10) ['start', 1, 2, 3, 4, 5, 0, 1, 2, 'end']

// REMOVE Elements from the Original Array... :
// *** it MUTATES the Original Array:
// *** ... FROM the END of the Array:
console.log(originalArray.pop()); // "end" - it REMOVES the LAST Element from an Array and RETURNS it

// *** ... FROM the START of the Array:
console.log(originalArray.shift()); // "start" - it REMOVES the FIRST Element from an Array and RETURNS it

// EXTRACT / RETRIEVE ELEMENTS from the Array:
// *** WITHOUT MUTATING the Original Array:
console.log(originalArray.slice(2)); // (6) [3, 4, 5, 0, 1, 2]
console.log(originalArray.slice(2, 4)); // (2) [3, 4]
console.log(originalArray.slice(2, -1)); // (5) [3, 4, 5, 0, 1]
console.log(originalArray.slice(-4)); // (4) [5, 0, 1, 2]

console.log(originalArray.at(0)); // 1

// *** MUTATE the Original Array:
console.log(originalArray);
*/

//////////////////////////////////////////////////////////////////////////////////////////////////
// EXTRA - RADU
// Reverse a String WITHOUT using the ".reverse()" and / or ".push()" Methods:
const reverseString = function (str) {
  let reverseArray = [];
  const stringSplit = str.split("");
  // console.log(stringSplit);
  const reverse = stringSplit.forEach((letter, i) =>
    reverseArray.unshift(stringSplit.at(i))
  );
  console.log(reverseArray.join(""));

  // OR
  // for (let i = 0; i < str.length; i++) {
  //   reverseArray.unshift(stringSplit.at(i));
  // }
  // console.log(reverseArray.join(""));

  return reverseArray.join("");
};
reverseString("reverseString");
reverseString("1234567890");

//////////////////////////////////////////////////////////////////////////////////////////////////
// Array Methods Practice Jonas

// 1. how much has been deposited in total in the bank?
const bankDepositSum = accounts
  .flatMap((account) => account.movements)
  .filter((deposit) => deposit > 0)
  .reduce((acc, deposit) => acc + deposit, 0);
console.log(bankDepositSum); // 25180

// 2. how many deposits there have been in the bank with at least $1,000?
const totalNumberOfDeposits1000 = accounts
  .flatMap((account) => account.movements)
  .filter((deposit) => deposit >= 1000).length;
console.log(totalNumberOfDeposits1000); // 6 deposits >= 1000
//  OR
const totalNumberOfDeposits1000v2 = accounts
  .flatMap((account) => account.movements)
  // .reduce((count, deposit) => (deposit >= 1000 ? count + 1 : count), 0); // count++ DOES NOT WORK => 0, we must use ++count or count + 1 instead
  .reduce((count, deposit) => (deposit >= 1000 ? ++count : count), 0);
console.log(totalNumberOfDeposits1000v2);

// the PRE-FIXED "++" OPERATOR
let a = 10;
console.log(a++); // !!! 10, NOT 11 - it works, but it STILL DISPLAYS THE OLD VALUE , which is 10
console.log(a); // 11 - PROOF that the "a++" WORKED
console.log(++a); // 12 - WE MUST USE THE PRE-FIXED "++" OPERATOR BEFORE the Value to DISPLAY IT PROPERLY
console.log(a); // 12

// 3. create an object which contains the sum of the deposits and of the withdrawals.
const sumsAllDepositsAndWithdrawals = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (sums, currentElement) => {
      // currentElement >= 0
      //   ? (sums.deposits2 += currentElement)
      //   : (sums.withdrawals2 += currentElement);
      // OR BETTER for DRY - using the BRACKET notation:
      sums[currentElement >= 0 ? "deposits2" : "withdrawals2"] +=
        currentElement;
      return sums;
    },
    { deposits2: 0, withdrawals2: 0 }
  );
console.log(sumsAllDepositsAndWithdrawals); // {deposits2: 25180, withdrawals2: -7340}
// we can use DESTRUCTURING  to get the values of the deposits and of the withdrawals
const { deposits2, withdrawals2 } = sumsAllDepositsAndWithdrawals;
console.log(deposits2, withdrawals2);
// !!! REMEMBER !!!
// THIS:
console.log(sumsAllDepositsAndWithdrawals["deposits2"]); // using the BRACKET notation // 25180
// IS THE SAME AS THIS:
console.log(sumsAllDepositsAndWithdrawals.deposits2); // using the DOT notation // 25180
const jonas = { firstName: "Jonas", lastName: "Schmedtmann" };
console.log(jonas.lastName); // Schmedtmann
console.log(jonas["lastName"]); // Schmedtmann

// 4. RECREATE THE CHALLENGES ABOVE : "And I would even challenge you to do this with arrays. So as a challenge, I would challenge you to recreate any of the examples that we did previously in the section with map filter and reduce to use only the reduce method. And that is totally possible. And so, yeah, you can try that out."
// ...

// 5.1. create a function to convert any string to a title case.
// ex: this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  // this will display and return "and Here Is Another Title with an Example" so we need to appply the "capitalize" function to it and return it:
  // console.log(titleCase);
  // return titleCase;
  console.log(capitalize(titleCase));
  return capitalize(titleCase);
};

convertTitleCase("this is a nice title");
convertTitleCase("this is a LONG title but not too long");
convertTitleCase("and here is another title with an EXAMPLE");

//////////////////////////////////////////////////////////////////////////////////////////////////
// EXTRA - RADU
// 5.2. Write a function that receives variable names written in underscore_case and converts them to camelCase.
// Test data:
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

const convertToCamelCase = function (str) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const convert = str
    .toLowerCase()
    .trim()
    .split("_")
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join("");

  console.log(convert);
  return convert;
};

convertToCamelCase("underscore_case");
convertToCamelCase(" first_name_Some_Variable");
convertToCamelCase("  calculate_AGE_underscore_case_RANdom_wOrD_123_fOUr   ");

// 5.3. Write a function that hides / masks all the digits of a credit card number, except the last 3
const maskCreditCard = function (num) {
  const str = num + "";
  // console.log(str);

  const mask = str
    .toLowerCase()
    .trim()
    .split("")
    .map((digit, index, arr) => (index < arr.length - 3 ? "*" : digit))
    .join("");
  console.log(`Your credit card number is: ${mask}`);
  return mask;
};
maskCreditCard(123456789);
maskCreditCard("123456789");
maskCreditCard("  123456  \n");

//////////////////////////////////////////////////////////////////////////////////////////////////
// 6. Coding Challenge Jonas:

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 6.1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach((dog) => (dog.recFood = Math.round(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 6.2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// Radu:
const sarahsDog = dogs.filter((dog) => dog.owners.includes("Sarah"));
console.log(sarahsDog);
sarahsDog[0].curFood > sarahsDog[0].recFood
  ? console.log(`Sarah's dog is eating too much`)
  : console.log(`Sarah's dog is eating too little`);

// Jonas:
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  } `
);

// 6.3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// Radu === Jonas:
console.log(dogs);
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);

// 6.4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// Radu === Jonas:
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 6.5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// Radu === Jonas:
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6.6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// Radu:
console.log(
  dogs.some(
    (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);
// Jonas:
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));
// 6.7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// Radu === Jonas:
console.log(dogs.filter(checkEatingOkay));

// 6.8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
// Radu:
console.log(dogs);
const sortedDogs = Array.from(dogs).sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);

// Jonas:
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
