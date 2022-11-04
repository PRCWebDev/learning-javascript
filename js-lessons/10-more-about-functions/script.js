'use strict';

///////////////////////////////////////
// 1. Default Parameters
const bookings = [];

// Setting Default Parameters After ES6
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Setting Default Parameters Before ES6
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

// createBooking("LH123");
// createBooking("LH123");
// createBooking("LH123", 2, 800);
// createBooking("LH123", 2);
// createBooking("LH123", 5);

createBooking('LH123', undefined, 1000); // skipping a Default Parameter by setting it to "undefined" when we CALL the function

///////////////////////////////////////
// 2. How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    // alert("Checked in");
  } else {
    // alert("Wrong passport!");
  }
};
// This...
// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// ... is the same as doing this:
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

///////////////////////////////////////
// 3. HIGHER-ORDER Functions
// 3.1. Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};
// console.log(oneWord("JavaScript is the best!"));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' '); // "..." = the REST Operator used here to PACK all of the remaining words into one Array
  return [first.toUpperCase(), ...others].join(' '); // "..." = the SPREAD Operator used here to UNPACK the "others" Array created earlier with the Rest Operator
};
// console.log(upperFirstWord("JavaScript is the best!"));

// THIS IS the HIGHER-ORDER Function:
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // CALLING the CALLBACK function ("fn" = "upperFirstWord" / "oneWord")

  console.log(`Transformed by: ${fn.name}`); // APPLYING the ".name" METHOD on the "fn" function
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// the "upperFirstWord" and the "oneWord" functions are NOT CALLED when passed as ARGUMENTS into the "transformer" function, they are CALLED INSIDE the "transformer" function LATER, whenever the "transformer" function is CALLED / EXECUTED => the "upperFirstWord" and the "oneWord" functions are CALLBACK functions & the "transformer" function is a HIGHER-ORDER function (because it receives a function as an Argument)

// JS uses CALLBACK Functions ALL THE TIME
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

///////////////////////////////////////
// 3.2. Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}! 👋`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
// OR
greet('Ola')('Jose');
// Functions Returning Functions are VERY IMPORTANT when using the FUNCTIONAL PROGRAMMING PARADIGM

// Challenge
// RE-written WITH Arrow Functions
// ** REMEMBER that "Arrow Functions DO NOT GET their OWN "this" keyword"
// ** "Instead, the "this" keyword in ARROW FUNCTIONS is the LEXICAL "this" keyword which means that it uses the "this" keyword of it's PARENT function or of it's PARENT scope (..."in this case, the WINDOW OBJECT (aka the Global Object, aka the Global Window Object)"...)"
const greetArrow = (greeting) => (name) =>
  console.log(`${greeting}, ${name}! 👋`);

greetArrow('Howdy')('Bobby');

///////////////////////////////////////
// 4. The CALL and APPLY Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // Method Syntax BEFORE ES6
  // book: function() {}
  // Method Syntax AFTER ES6
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
// WORKS
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // A SEPARATE COPY, NOT A METHOD anymore, it has now became JUST ANOTHER REGULAR / SIMPLE FUNCTION

// Does NOT work:
// book(23, "Sarah Williams");
// this is JUST ANOTHER REGULAR / SIMPLE FUNCTION CALL => the "this" keyword applied to Regular / Simple Functions CALLS RETURNS "undefined" (in STRICT MODE)

// WORKS
// 4.1. The CALL Method
// allows us to manually SET the "this" keyword of ANY Function we want to CALL
// ** REMEMBER: "Functions are JUST ANOTHER TYPE of OBJECTS => we can APPLY / CALL METHODS on Functions just like we do on Objects"
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);
// 4.2. The APPLY Method
// similar to the CALL Method, but takes an ARRAY of Data as ARGUMENTS instead of a LIST of Data, after the "this" keyword
// it will take the elements of that ARRAY and pass it into the function
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// the APPLY Method is NOT THAT USED anymore because we can combine the CALL Method with the SPREAD Operator and get the same result:
book.call(swiss, ...flightData);
console.log(swiss);

///////////////////////////////////////
// 5. The BIND Method
// book.call(eurowings, 23, 'Sarah Williams');
// the BIND Method does NOT immediately CALL the function
// instead, it returns a NEW Function where the "this" keyword is ALWAYS BOUND => we can use the BIND Method to SET the "this" keyword to ANY VALUE we pass into that NEW Function

const bookEW = book.bind(eurowings); // SETING the "this" keyword to "eurowings"
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(12345, 'Steven Williams'); // CALLING the NEW Function

// we can even SET the DEFAULT ARGUMENTS of that NEW Function if we want to => the PARTIAL APPLICATION PATTERN:
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// Practical example
// Practical example
// Using the BIND Method WITH Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

// this does NOT work:
// if we were NOT Using the BIND Method together WITH the Event Listener, the "lufthansa.buyPlane" would point to the "<button class="buy">Buy new plane ✈</button>" and it would NOT return a number:
// !!! BECAUSE, in an Event Handler Function, the "this" keyword ALWAYS POINTS TO the ELEMENT on which that Handler Function is ATTACHED !!!
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
//=>
// "<button class="buy">Buy new plane ✈</button>"  +  // "NaN"
// (the ELEMENT on which that Event Handler Function is ATTACHED <=> the ".addEventListener('click', lufthansa.buyPlane)" (Event Handler Function / Method) is ATTACHED TO the BUTTON (ELEMENT) with the CLASS of "buy" (document.querySelector('.buy') SELECTS / POINTS TO "<button class="buy">Buy new plane ✈</button>"))

// THIS WORKS - Using the BIND Method WITH Event Listeners:
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// BINDing the "lufthansa" OBJECT to the button click

// Practical example
// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); //  the "this" keyword is SET to "null" because we don't care about it, it doesn't even appear in the function
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge
// using Functions Returning Functions to get the same outcome
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// OR Radu
const addTaxRate2 = (rate) => (value) =>
  console.log(
    `RADU - USING "RETURN" AND "CONSOLE.LOG();" TOGETHER !!!! Hell yeah, baby: ${
      value + value * rate
    }`
  ); // RADU - USING "RETURN" AND "CONSOLE.LOG();" TOGETHER !!!!
// THIS IS THE SAME AS DOING THIS:
// {
// console.log(`${rate}, ${value}`);
// return console.log(`Hell yeah, baby: ${value + value * rate}`); // RADU - USING "RETURN" AND "CONSOLE.LOG();" TOGETHER !!!!
// }

addTaxRate2(0.19)(100);
///////////////////////////////////////
// Coding Challenge #1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS:
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

///////////////////////////////////////
// 6. Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will run again');
};
runOnce();
// we can Call this function anytime

// IIFE Pattern
(function () {
  console.log('This will NEVER run again');
  const isPrivate = 23; // the "isPrivate" variable is ENCAPSULATED INSIDE THE FUNCTION SCOPE, it cannot be accessed from outside the function
})();
// RUNS the function ONLY ONCE, IMMEDIATELY after it has been created

// ALSO IIFE
(() => console.log('This will ALSO never run again'))();

// console.log(isPrivate); // NOT WORKING because of SCOPING

// /after ES6, we can HIDE / PROTECT variables with "let" / "const" which are BLOCK SCOPED
{
  const isPrivate = 23; // BLOCK SCOPED - cannot be accessed from outside the Code Block
  var notPrivate = 46; // HOISTED - it can be accessed from outside the Code Block
}
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////////
// 7. CLOSURES !!!
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// console.log(passengerCount); // NOT working because "passengerCount" is BLOCK SCOPED

const booker = secureBooking();
// secureBooking()();
// secureBooking()();
// secureBooking()();

booker(); // WORKS because of CLOSURES
booker();
booker();

// to ONLY LOOK at into the CLOSURE / BACKPACK of a function, we use:
console.dir(booker);
// "[[...]]" = double brackets mean it's an INTERNAL PROPERTY of a function

///////////////////////////////////////
// 7.1. More Closure Examples !!!
// WE DON'T ALWAYS NEED TO RETURN A FUNCTION TO SEE A CLOSURE IN ACTION => we can use Functions RETURNING Functions, CALLBACK Functions ETC.(??) TO SEE A CLOSURE IN ACTION
// Example 1
let f; // the "f" Variable is created in the Global Scope

const g = function () {
  const a = 23;
  f = function () {
    // we assigned a function to the "f" Variable => a "f" function was created INSIDE the "g" function
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    // we RE-assigned a function to the "f" Variable => ANOTHER "f" function was created INSIDE the "h" function
    console.log(b * 2);
  };
};

g(); // the birthplace of the "f" function
f(); // now the "f" function ALWAYS has ACCESS from it's BACKPACK / CLOSURE to the "a" Variable => "console.log(a(=23) * 2)" => 46
console.dir(f); // [[Scopes]] : Scopes[3] 0 : Closure (g) {a: 23} ....

// Re-assigning the "f" function
h(); // the rebirth place of the SAME "f" function
f(); // now the "f" function ALWAYS has ACCESS from it's BACKPACK / CLOSURE to the "b" Variable => "console.log(b(=777) * 2)" => 1554
console.dir(f); // [[Scopes]] : Scopes[3] 0 : Closure (h) {b: 777} ....

console.log(f); // ƒ () {
// we RE-assigned a function to the "f" Variable => ANOTHER "f" function was created INSIDE the "h" function
//   console.log(b * 2);
// }

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // test of CLOSURE PRIORITY over the Scope Chain

  // a CALLBACK function
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // PROOF that the CLOSURE has PRIORITY over the Scope Chain
boardPassengers(180, 3);
// Will start boarding in 3 seconds
// We are now boarding all 180 passengers // NOT 1000 !!
// There are 3 groups, each with 60 passengers

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

const header = document.querySelector('h1');
header.style.color = 'yellow';
(function () {
  const header = document.querySelector('h1'); // test of CLOSURE PRIORITY over the Scope Chain
  header.style.color = 'red'; // test of CLOSURE PRIORITY over the Scope Chain // Another PROOF that the CLOSURE has PRIORITY over the Scope Chain // 'red', NOT 'yellow' !!

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
