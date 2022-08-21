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
const displayMovements = function (movements, sort = false) {
  // DOM Manipulation:
  // CLEARING / EMPTYING the "Movements" container:
  containerMovements.innerHTML = ""; // this REMOVES ALL previous entries

  const sortingMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  // we are using the ".slice();" Method to CREATE A SHALLOW COPY of the underlying "movements" Array because we DO NOT WANT TO MUTATE the Original "movements" Array
  // we are SORTING the "movements" Array in an Ascending Order (a - b) because we are Displaying the movements with the latest on top so we want to actually have them Displayed in a Descending Order, from the biggest movement to the smallest

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

const calcDisplayBalance = function (acc) {
  // ADDING A NEW PROPERTY "balance" to EACH of the "accounts" in the "accounts" Array (account1, account2, account3, account4):
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  // DOM Manipulation:
  labelBalance.textContent = `${acc.balance} €`;
};

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

  // the bank only pays an "interest" if the deposit is 1 euro or above:
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
