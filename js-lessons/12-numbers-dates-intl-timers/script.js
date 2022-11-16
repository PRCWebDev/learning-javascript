'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BANKIST APP

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // if (currentAccount?.pin === Number(inputLoginPin.value)) {
  // Using the UNARY PLUS Operator for Type Coercion INSTEAD of the "Number()" CONSTRUCTOR
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // const amount = Number(inputTransferAmount.value);
  // Using the UNARY PLUS Operator for Type Coercion INSTEAD of the "Number()" CONSTRUCTOR
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // const amount = Number(inputLoanAmount.value);
  // Using the UNARY PLUS Operator for Type Coercion INSTEAD of the "Number()" CONSTRUCTOR
  // const amount = +inputLoanAmount.value;
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    // Number(inputClosePin.value) === currentAccount.pin
    // Using the UNARY PLUS Operator for Type Coercion INSTEAD of the "Number()" CONSTRUCTOR
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LECTURES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Converting and Checking Numbers
console.log(23 === 23.0); // true

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2); // 0.30000000000000004 - lol :D
// EXTRA - Radu:
/*
const a = 0.1;
const b = 0.2;
const sum = a + b;
console.log(a + b, sum); // 0.30000000000000004 0.30000000000000004 BECAUSE "numbers are represented internally in a 64 base 2 format (BINARY BASE). So that means that numbers are always stored in a BINARY format. So basically, they're only composed of 0s and 1s."
*/
console.log(0.1 + 0.2 === 0.3); // false - lol :D

///////////////////////////////////////
// 1.1. Conversion of String to Number:
// 1.1.1. Using the "Number()" CONSTRUCTOR for Type Coversion:
console.log(Number('23')); // 23

// 1.1.2. Using the "+" UNARY PLUS Operator for Type Coercion:
console.log(+'23'); // 23
// "this works because when JavaScript sees the "+" operator, it will do type coercion."

// 1.2. Using PARSING (Reading / Getting / Extracting a Number out of a String):
// 1.2.1. Using PARSING foR INTEGERS numbers:
console.log(Number.parseInt('30px', 10)); // 30 // this WORKS
console.log(Number.parseInt('030px', 10)); // 30 // this ALSO WORKS
console.log(Number.parseInt('     00000000030px   ', 10)); // 30 // this ALSO WORKS - WHITESPACES DO NOT AFFECT IT
// Converts A S to an integer.
// @param string — A string to convert into a number.
// @param radix
// A value between 2 and 36 that specifies the BASE of the number in string. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.

console.log(Number.parseInt('e23', 10)); // NaN // this DOESN'T work BECAUSE it DOESN'T START with a Number

// EXTRA - Radu:
/*
// NOT WORKING:
console.log(Number.parseInt('14', 2)); // this DOESN'T work properly - I keep getting "1" or "NaN"
console.log(Number.parseInt('01555', 2)); // this DOESN'T work properly - I keep getting "1" or "NaN"
console.log(Number.parseInt('65', 2)); // this DOESN'T work properly - I keep getting "1" or "NaN"
*/

// console.log(14.toString(2)); // this DOESN'T work WITHOUT PARENTHESIS "()" // "Uncaught SyntaxError: Invalid or unexpected token"
console.log((14).toString(2)); // 1100 // this WORKS ONLY WITH PARENTHESIS "()"
// USE INSTEAD:
const fourteen = 14;
console.log(fourteen.toString(2)); // 1100 // this WORKS

// 1.2.2. Using PARSING for DECIMAL numbers (12.3456789):
console.log(Number.parseInt('  2.5rem  ')); // 2 - NOT CORRECT - we ONLY GET the INTEGER part of the number - WHITESPACES DO NOT AFFECT IT
console.log(Number.parseFloat('           2.5rem  ')); // 2.5 - CORRECT - WHITESPACES DO NOT AFFECT IT

// console.log(parseFloat('  2.5rem  '));

///////////////////////////////////////
// 1.3. Checking if value is NaN / Checking if value is a Number:
// V1:
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20')); // false
console.log(Number.isNaN(+'20X')); // true - NaN
console.log(Number.isNaN(23 / 0)); // true - NaN - "23/0 = Infinity"

// V2 - BETTER than V1:
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false - NaN
console.log(Number.isFinite(+'20')); // true
console.log(Number.isFinite(+'20X')); // false - NaN
console.log(Number.isFinite(23 / 0)); // false - "Infinity"

// Checking if value is an INTEGER Number:
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger('23')); // false
console.log(Number.isInteger(23 / 0)); // false - "Infinity"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2. Math and Rounding
// Square root:
console.log(Math.sqrt(25)); // 5
// OR
console.log(25 ** (1 / 2)); // 5

// Cubic root:
console.log(8 ** (1 / 3)); // 2

// Max value:
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 - Type Coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

// Min value:
console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

console.log(Math.trunc(Math.random() * 6) + 1); // "The Math.random() function returns a floating-point, pseudo-random number that's GREATER than OR EQUAL to 0 and LESS than 1"

// Creating a function that returns a Random POSITIVE INTEGER Number (>=0) between 2 values (a min value and a max value)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// Math.random() => 0...1 * (max - min) ((+1)) -> 0...(max - min) -> (0 + min)...(max - min + min) -> min...max
console.log(randomInt(10, 20));

// MORE EXAMPLES @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Rounding integers
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24
console.log(Math.round('23.9'), typeof Math.round('23.9')); // 24 - number - Type Coercion !!!

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24
console.log(Math.ceil('23.9'), typeof Math.ceil('23.9')); // 24 - number - Type Coercion !!!

console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9'), typeof Math.floor('23.9')); // 23 - number - Type Coercion !!!

console.log(Math.trunc(23.3)); // 23
console.log(Math.trunc('23.9'), typeof Math.trunc('23.3')); // 23 - number - Type Coercion !!!

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24 !!!

// Rounding decimals:
// the ".toFixed()" Method "Returns a STRING representing a number in fixed-point notation."
console.log((2.7).toFixed(0)); // BOXING...
/*
JUST LIKE STRINGS, NUMBERS are ALSO just PRIMITIVES.
So why do they have methods?

Whenever we call a method on a Number, JavaScript will automatically, behind the scenes, CONVERT that Number Primitive to a Number OBJECT with the same content.
And then it's on that OBJECT where the Methods are CALLED.

This process is called BOXING because it basically takes our Number and puts it into a BOX which is the OBJECT.
When the operation is done the Object is converted back to a regular Number Primitive.
*/
console.log((2.7).toFixed(3)); // '2.700' // "Returns a STRING representing a number in fixed-point notation."
console.log((2.366).toFixed(2)); // '2.37' - string // !!! IT ALSO ROUNDS IT UP
console.log(+(2.345).toFixed(2)); // 2.345 - number - because of the "+" UNARY PLUS Operator

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. The Remainder Operator "%" :
console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2);

console.log(7 % 2); // 1
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    // if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
