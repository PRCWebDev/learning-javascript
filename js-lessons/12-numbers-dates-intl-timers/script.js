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

///////////////////////////////////////
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

// 4. Numeric Separators "_":
// 287,460,000,000
const diameter = 287_460_000_000; // 287460000000
console.log(diameter);

const priceInCents = 345_99; // 34599
console.log(priceInCents);

const weightInGrams = 69_000;
console.log(weightInGrams); // 69000

const transferFee1 = 15_00; // 1500
const transferFee2 = 1_500; // 1500
console.log(transferFee1, transferFee2);

const PI = 3.1415;
console.log(PI); // 3.1415

console.log(Number('230_000')); // NaN - DOES NOT WORK because we used the Numeric Separator "_" on a String, NOT on a Number
console.log(parseInt('230_000')); // 230 - kinda works, but BETTER AVOID !!!

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 5. Working with BigInt
console.log(2 ** 53 - 1); // 9007199254740991 - the Maximum value of a Normal Integer number accepted by JS
// OR
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 - the Maximum value of a Normal Integer number accepted by JS
console.log(2 ** 53 + 1); // AVOID
console.log(2 ** 53 + 2); // AVOID
console.log(2 ** 53 + 3); // AVOID
console.log(2 ** 53 + 4); // AVOID

console.log(4838430248342043823408394839483204); // WITHOUT THE the "n" at the end of number // 4.8384302483420437e+33
console.log(4838430248342043823408394839483204n); // the "n" at the end of the number TRANSFORMS IT to a BigInt(eger) Number // 4838430248342043823408394839483204n
// OR using the CONSTRUCTOR "BigInt()"
console.log(BigInt(48384302)); // 48384302n

///////////////////////////////////////
// 5.1. (Mathematical) Operations - we MUST CONVERT the Normal Integer number to a BigInt number for (Mathematical) Operations to WORK
console.log(10000n + 10000n); // 20000n
console.log(36286372637263726376237263726372632n * 10000000n); // 362863726372637263762372637263726320000000n
// console.log(Math.sqrt(16n)); //  DOES NOT WORK // "Cannot convert a BigInt value to a number at Math.sqrt (<anonymous>)"
console.log(12n / 3n); // 4n
console.log(11n / 3n); // 3n !!! IT CUTS OFF the Decimal part !!!
console.log(11 / 3); // 3.6666666666666665

const huge = 20289830237283728378237n;
const num = 23;
// console.log(huge * num); // DOES NOT WORK // "Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions"
console.log(huge * BigInt(num)); // this WORKS - because we CONVERTED the Normal Integer number to a BigInt number // 466666095457525752699451n

///////////////////////////////////////
// 5.2. Type Coercion of BigInt numbers
console.log(typeof 20n); // 'bigint'
console.log(20n > 15); // true
// console.log(20n === 20); // false
console.log(20n == '20'); // true
console.log(huge + ' is REALLY big!!!'); // 20289830237283728378237 is REALLY big!!!

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 6. Creating Dates
// 6.1. Creating a Date
const now = new Date();
console.log(now); // 'Thu Nov 17 2022 21:36:12 GMT+0200'

console.log(new Date('Thu Nov 17 2022 21:13:30')); // 'Thu Nov 17 2022 21:36:12 GMT+0200'
console.log(new Date('December 24, 2024')); // 'Tue Dec 24 2024 00:00:00 GMT+0200'
console.log(new Date(account1.movementsDates[0])); // 'Mon Nov 18 2019 23:31:17 GMT+0200'

// The Month in JS is Zero-based => 0 === January, 1 === February ... 11 === December
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Y M D H Min Sec // 'Thu Nov 19 2037 15:23:05 GMT+0200'
// !!! 10 !== Nov => The Month in JS is Zero-based => 0 === January, 1 === February ... 11 === December
// ALSO: JS ADDS the Correct Day of the Week in front of the Date
console.log(new Date(2037, 0, 19, 15, 23, 5)); // 'Mon Jan 19 2037 15:23:05 GMT+0200'
console.log(new Date(2037, 1, 19, 15, 23, 5)); // 'Thu Feb 19 2037 15:23:05 GMT+0200'
console.log(new Date(2037, 11, 19, 15, 23, 5)); // 'Sat Dec 19 2037 15:23:05 GMT+0200'

// JS AUTO-CORRECTS the Date / Day:
console.log(new Date(2037, 10, 31)); // JS AUTO-CORRECTS the Date / Day // 'Tue Dec 01 2037 00:00:00 GMT+0200'
console.log(new Date(2037, 11, 39)); // JS AUTO-CORRECTS the Date / Day // 'Fri Jan 08 2038 00:00:00 GMT+0200'

//  we can also pass into the "Date" CONSTRUCTOR function the amount of MILLISECONDS passed since the beginning of the UNIX TIME, which is January 1, 1970
console.log(new Date(0)); // 'Thu Jan 01 1970 02:00:00 GMT+0200'
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 Days * 24 Hours * 60 Min * 60 Sec * 1000 msec // 'Sun Jan 04 1970 02:00:00 GMT+0200'
// TIMESTAMP === 259200000 === 3 * 24 * 60 * 60 * 1000

///////////////////////////////////////
// 6.2. Working with Dates
// !!! Dates are just ANOTHER TYPE of OBJECTS => DATES HAVE METHODS:
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // 'Thu Nov 19 2037 15:23:00 GMT+0200'

console.log(future.getFullYear()); // 2037 !!! ALWAYS USE ".getFullYear()"
// !!! NEVER USE ".getYear()"
// console.log(future.getYear()); // 137 ??????
console.log(future.getMonth()); // 10 // The Month in JS is Zero-based => 10 === Nov
console.log(future.getDate()); // 19 // the Day of the Month
console.log(future.getDay()); // 4 // the Day of the Week
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // '2037-11-19T13:23:00.000Z'
console.log(future.getTime()); // 2142249780000 // !!! GET TIMESTAMP !!!

// !!! Creating a Date USING THE TIMESTAMP:
console.log(new Date(2142256980000)); // 'Thu Nov 19 2037 17:23:00 GMT+0200'

console.log(Date.now()); // 'Thu Nov 19 2037 17:23:00 GMT+0200'

// !!! we can ALSO SET the Date - using ".set...()" instead of the ".get...()" Methods:
future.setFullYear(2040);
console.log(future); // 'Mon Nov 19 2040 15:23:00 GMT+0200'
console.log(future.setDate(19)); // 2236944180000 // the Day of the Month TIMESTAMP

// console.log(future.setDay(4)); // 'future.setDay is not a function' - DOES NOT WORK

// Jonas:
console.log(future.setHours(18)); // 2236954980000 // TIMESTAMP // 18H
console.log(future.setMinutes(22)); // 2236954920000 // TIMESTAMP // 18H 22Min
console.log(future.setSeconds(55)); // 2236954975000 // TIMESTAMP // // 18H 22Min 55Sec
// EXTRA - Radu:
// OR BETTER:
console.log(future.setHours(18, 22, 55, 0)); // 2236958575000 // TIMESTAMP // "setHours(hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined): number" // 18H 22Min 55Sec 0msec

console.log(future.setTime(2236954975000)); // 2236954975000 // SET TIMESTAMP
console.log(future); // 'Mon Nov 19 2040 18:22:55 GMT+0200' // ORIGINAL DATE IS NOT CHANGED by the ".set...()" Methods

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
