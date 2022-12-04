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
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // portuguese-Portugal
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
  locale: 'en-US', // english-US
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // Instead of using the "locale" coming from the user's browser
    // const locale = navigator.language;
    // console.log(locale);
    // ... we use the "locale" from the "account1" & "account1" Objects:
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
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
  displayMovements(currentAccount, !sorted);
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
// 1.1.1. Using the "Number()" CONSTRUCTOR for Type Conversion:
console.log(Number('23')); // 23

// 1.1.2. Using the "+" UNARY PLUS Operator for Type Coercion:
console.log(+'23'); // 23
// "this works because when JavaScript sees the "+" operator, it will do type coercion."

///////////////////////////////////////
// 1.2. Using PARSING (Reading / Getting / Extracting a Number out of a String):
// 1.2.1. Using PARSING for INTEGERS numbers:
console.log(Number.parseInt('30px', 10)); // 30 // this WORKS
console.log(Number.parseInt('030px', 10)); // 30 // this ALSO WORKS
console.log(Number.parseInt('     00000000030px   ', 10)); // 30 // this ALSO WORKS - WHITESPACES DO NOT AFFECT IT
// Converts a String to an Integer.
// @param string - A string to convert into a number.
// @param radix - A value between 2 and 36 that specifies the BASE of the number in string. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.

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
console.log(Number.isInteger(23.3)); // false
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

const PI = 3.14_15;
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

// 6. Dates
///////////////////////////////////////
// 6.1. Creating a Date
const now2 = new Date();
console.log(now2); // 'Thu Nov 17 2022 21:36:12 GMT+0200 (Eastern European Standard Time)'

console.log(new Date('Thu Nov 17 2022 21:13:30')); // 'Thu Nov 17 2022 21:13:30 GMT+0200 ...'
console.log(new Date('December 24, 2024')); // 'Tue Dec 24 2024 00:00:00 GMT+0200 ...'
console.log(new Date(account1.movementsDates[0])); // 'Mon Nov 18 2019 23:31:17 GMT+0200 ...'

// The Month in JS is Zero-based => 0 === January, 1 === February ... 11 === December
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Y M D H Min Sec // 'Thu Nov 19 2037 15:23:05 GMT+0200 ...'
// !!! 10 !== Nov => The Month in JS is Zero-based => 0 === January, 1 === February ... 11 === December
// ALSO: JS ADDS the Correct Day of the Week in front of the Date
console.log(new Date(2037, 0, 19, 15, 23, 5)); // 'Mon Jan 19 2037 15:23:05 GMT+0200 ...'
console.log(new Date(2037, 1, 19, 15, 23, 5)); // 'Thu Feb 19 2037 15:23:05 GMT+0200 ...'
console.log(new Date(2037, 11, 19, 15, 23, 5)); // 'Sat Dec 19 2037 15:23:05 GMT+0200 ...'

// JS AUTO-CORRECTS the Date / Day:
console.log(new Date(2037, 10, 31)); // JS AUTO-CORRECTS the Date / Day // 'Tue Dec 01 2037 00:00:00 GMT+0200 ...'
console.log(new Date(2037, 11, 39)); // JS AUTO-CORRECTS the Date / Day // 'Fri Jan 08 2038 00:00:00 GMT+0200 ...'

//  we can also pass into the "Date" CONSTRUCTOR function the amount of MILLISECONDS passed since the beginning of the UNIX TIME, which is January 1, 1970
console.log(new Date(0)); // 'Thu Jan 01 1970 02:00:00 GMT+0200 ...'
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 Days * 24 Hours * 60 Min * 60 Sec * 1000 msec // 'Sun Jan 04 1970 02:00:00 GMT+0200 ...'
// TIMESTAMP === 259200000 === 3 * 24 * 60 * 60 * 1000

// !!! Creating a Date USING THE TIMESTAMP:
console.log(new Date(259200000)); // 'Sun Jan 04 1970 02:00:00 GMT+0200 ... (Eastern European Standard Time)'

///////////////////////////////////////
// 6.2. Working with Dates
// !!! Dates are just ANOTHER TYPE of OBJECTS => DATES HAVE METHODS:
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // 'Thu Nov 19 2037 15:23:00 GMT+0200 ...'

// 6.2.1. GET Dates Methods
console.log(future.getFullYear()); // 2037 !!! ALWAYS USE ".getFullYear()"
// !!! NEVER USE ".getYear()"
// console.log(future.getYear()); // 137 ??????
// !!! NEVER USE ".getUTCFullYear()" because of Daylight Saving
// console.log(future.getUTCFullYear()); // 2037
console.log(future.getMonth()); // 10 // The Month in JS is Zero-based => 10 === Nov // !!! NUMBER
console.log(future.getDate()); // 19 // the Day of the Month // !!! NUMBER
console.log(future.getDay()); // 4 // the Day of the Week // !!! NUMBER
console.log(future.getHours()); // 15 // !!! NUMBER
console.log(future.getMinutes()); // 23 // !!! NUMBER
console.log(future.getSeconds()); // 0 // !!! NUMBER
console.log(future.toISOString()); // '2037-11-19T13:23:00.000Z' // STRING => VERY USEFUL for Converting Date to STRING and Store it somewhere...
console.log(future.getTime()); // 2142249780000 // !!! GET TIMESTAMP !!! // !!! NUMBER

// !!! Creating a Date USING THE TIMESTAMP:
console.log(new Date(2142256980000)); // 'Thu Nov 19 2037 17:23:00 GMT+0200 ...'

// 6.2.2. Getting the TIMESTAMP of the Current Time:
console.log(Date.now()); // 1670085559724 // Number

// 6.2.3. SET Dates Methods
// we can ALSO SET the Date - using ".set...()" instead of the ".get...()" Methods:
// !!! ORIGINAL DATE IS CHANGED by the ".set...()" Methods !!!
future.setFullYear(2040);
console.log(future); // 'Mon Nov 19 2040 15:23:00 GMT+0200 ...'
console.log(future.setDate(11)); // 2236252980000 // the Day of the Month TIMESTAMP
console.log(future); // 'Sun Nov 11 2040 15:23:00 GMT+0200 (Eastern European Standard Time)' // !!! ORIGINAL DATE IS CHANGED by the ".set...()" Methods !!!

// console.log(future.setDay(4)); // 'future.setDay is not a function' - DOES NOT WORK

// Jonas:
console.log(future.setHours(18)); // 2236263780000 // TIMESTAMP // 18H
console.log(future.setMinutes(22)); // 2236263720000 // TIMESTAMP // 18H 22Min
console.log(future.setSeconds(55)); // 2236263775000 // TIMESTAMP // // 18H 22Min 55Sec
// EXTRA - Radu:
// OR BETTER:
console.log(future.setHours(18, 22, 55, 0)); // 2236958575000 // TIMESTAMP // "setHours(hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined): number" // 18H 22Min 55Sec 0msec
console.log(future); // 'Sun Nov 11 2040 18:22:55 GMT+0200 (Eastern European Standard Time)' // !!! ORIGINAL DATE IS CHANGED by the ".set...()" Methods !!!

console.log(future.setTime(2236954975000)); // 2236954975000 // SET TIMESTAMP
console.log(future); // 'Mon Nov 19 2040 18:22:55 GMT+0200 ...' // !!! ORIGINAL DATE IS CHANGED by the ".set...()" Methods !!!

//6.2.4. Operations With Dates
const future2 = new Date(2037, 10, 19, 15, 23);
console.log(future2); // Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time)
// !!! CONVERTING a DATE to a NUMBER:
console.log(+future2); // 2142249780000 - TIMESTAMP - NUMBER !!! - ONLY WHEN USING the "+" UNARY PLUS Operator !!!
// Otherwise, we get a STRING:
console.log(String(future2)); // Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time) - STRING
console.log(future2.toString()); // Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time) - STRING
console.log(future2 + ''); // Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time) - STRING
console.log(`${future2}`); // Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time) - STRING

// !!! Performing Operations With Dates WORKS REGARDLESS OF THE DATE FORMAT !!!
// BUT we still need to Convert the result into Days ("/ (1000 msec * 60 Sec * 60 Min * 24 Hours)")
// Otherwise, we will ONLY get the TIMESTAMP
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1); // 10 days // 864000000 / (1000 msec * 60 Sec * 60 Min * 24 Hours)

const days2 = calcDaysPassed(new Date(2037, 3, 4), new Date('April 24 2037'));
console.log(days2); // 20 days // 1728000000 / (1000 msec * 60 Sec * 60 Min * 24 Hours)

// console.log(new Date('April 24 2037')); // 'Fri Apr 24 2037 00:00:00 GMT+0300 (Eastern European Summer Time)
const days3 = calcDaysPassed(
  new Date('Fri Apr 17 2037'),
  new Date(2037, 3, 14)
);
console.log(days3); // 3 days // 259200000 / (1000 msec * 60 Sec * 60 Min * 24 Hours)

const getTimestamp = new Date('Fri Apr 17 2037').getTime();
console.log(getTimestamp); // 2123528400000 - TIMESTAMP - NUMBER !!!
const days4 = calcDaysPassed(getTimestamp, new Date(2037, 3, 14));
console.log(days4); // 3 days // 259200000 / (1000 msec * 60 Sec * 60 Min * 24 Hours)
const days5 = calcDaysPassed(new Date(2037, 3, 4), getTimestamp);
console.log(days5); // 13 days // 1123200000 / (1000 msec * 60 Sec * 60 Min * 24 Hours)

/*
If you need really precise calculations, for example, including time changes due to daylight saving changes and / or other weird edge cases like that, then you should use a date library like "moment.js" (https://momentjs.com/)
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 7. Internationalization (Intl) & Localization ("locale")
///////////////////////////////////////
// 7.1. Internationalizing Dates (Intl)
// JS uses the Internationalizing API
const now1 = new Date();
console.log(now1); // Sun Dec 04 2022 20:57:30 GMT+0200 (Eastern European Standard Time)

// ISO language code table @ http://www.lingoes.net/en/translator/langcode.htm
// const nowUS = new Intl.DateTimeFormat('en-US').format(now1);
// const nowRO = new Intl.DateTimeFormat('ro-RO').format(now1);
// const nowSyria = new Intl.DateTimeFormat('ar-SY').format(now1);
// console.log(nowUS, nowRO, nowSyria); // 12/4/2022 04.12.2022 ٢٠٢٢/١٢/٤

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  // month: '2-digit',
  // month: 'long',
  year: 'numeric',
  // year: '2-digit',
  weekday: 'long',
  // weekday: 'short',
  // weekday: 'narrow',
};

const nowUS = new Intl.DateTimeFormat('en-US', options).format(now1);
const nowRO = new Intl.DateTimeFormat('ro-RO', options).format(now1);
const nowSyria = new Intl.DateTimeFormat('ar-SY', options).format(now1);
console.log(nowUS); // Sunday, 12/4/2022, 9:20 PM
console.log(nowRO); // duminică, 04.12.2022, 21:20
console.log(nowSyria); // الأحد، ٤/١٢/٢٠٢٢ ٩:٢٠ م

///////////////////////////////////////
// 7.2. "Localizing" Dates AKA Getting the "locale" DATE FORMAT from the user's browser:
const locale = navigator.language;
console.log(locale); // "en-US" on my browser

///////////////////////////////////////
// 7.3. Internationalizing Numbers (Intl)
const num1 = 3884764.23;

const options1 = {
  // style: 'unit',
  // unit: 'mile-per-hour',

  // style: 'unit',
  // unit: 'celsius',
  // unit: 'fahrenheit',

  // style: 'percent',

  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options1).format(num1)); // US:       €3,884,764.23
console.log('Romania: ', new Intl.NumberFormat('ro-RO', options1).format(num1)); // Romania:  3.884.764,23 EUR
console.log('Germany: ', new Intl.NumberFormat('de-DE', options1).format(num1)); // Germany:  3.884.764,23 €
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options1).format(num1)); // Syria:    ٣٬٨٨٤٬٧٦٤٫٢٣ €

///////////////////////////////////////
// 7.4. "Localizing" Numbers AKA Getting the "locale" DATE FORMAT from the user's browser:
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options1).format(num1)
); // en-US €3,884,764.23

// MORE INFO @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
