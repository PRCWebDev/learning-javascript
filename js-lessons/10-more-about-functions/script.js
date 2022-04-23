"use strict";

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

createBooking("LH123");
createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking("LH123", undefined, 1000); // skipping a Default Parameter by setting it to "undefined" when we CALL the function

///////////////////////////////////////
// 2. How Passing Arguments Works: Values vs. Reference
const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

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
// 3. Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};
// console.log(oneWord("JavaScript is the best!"));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" "); // "..." = the REST Operator used here to PACK all of the remaining words into one Array
  return [first.toUpperCase(), ...others].join(" "); // "..." = the SPREAD Operator used here to UNPACK the "others" Array created earlier with the Rest Operator
};
// console.log(upperFirstWord("JavaScript is the best!"));

// HIGHER-ORDER Function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // CALLING the CALLBACK function ("fn" = "upperFirstWord" / "oneWord")

  console.log(`Transformed by: ${fn.name}`); // APPLYING the ".name" METHOD on the "fn" function
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);
// the "upperFirstWord" and the "oneWord" functions are NOT CALLED when passed as ARGUMENTS into the "transformer" function, they are CALLED INSIDE the "transformer" function LATER, whenever the "transformer" function is CALLED / EXECUTED => the "upperFirstWord" and the "oneWord" functions are CALLBACK functions & the "transformer" function is a HIGHER-ORDER function (because it receives a function as an Argument)

// JS uses CALLBACK Functions ALL THE TIME
// const high5 = function () {
//   console.log("👋");
// };
// document.body.addEventListener("click", high5);
// ["Jonas", "Martha", "Adam"].forEach(high5);

///////////////////////////////////////
// 4. Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}! 👋`);
  };
};
const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");
// OR
greet("Ola")("Jose");
// Functions Returning Functions are VERY IMPORTANT when using the FUNCTIONAL PROGRAMMING PARADIGM

// Challenge
// RE-written WITH Arrow Functions
// ** REMEMBER that "Arrow Functions DO NOT GET their OWN "this" keyword"
// ** "Instead, the "this" keyword in ARROW FUNCTIONS is the LEXICAL "this" keyword which means that it uses the "this" keyword of it's PARENT function or of it's PARENT scope (..."in this case, the WINDOW OBJECT (aka the Global Object, aka the Global Window Object)"...)"
const greetArrow = (greeting) => (name) =>
  console.log(`${greeting}, ${name}! 👋`);

greetArrow("Howdy")("Bobby");

///////////////////////////////////////
// 6. The CALL and APPLY Methods
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
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
lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book; // A SEPARATE COPY, NOT A METHOD anymore, it has now became JUST ANOTHER REGULAR / SIMPLE FUNCTION

// Does NOT work:
// book(23, "Sarah Williams");
// this is JUST ANOTHER REGULAR / SIMPLE FUNCTION CALL => the "this" keyword applied to Regular / Simple Functions CALLS RETURNS "undefined" (in STRICT MODE)

// WORKS
// 6.1. The CALL Method
// allows us to manually SET the "this" keyword of ANY Function we want to CALL
// ** REMEMBER: "Functions are JUST ANOTHER TYPE of OBJECTS => we can APPLY / CALL METHODS on Functions just like we do on Objects"
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);
// 6.2. The APPLY Method
// similar to the CALL Method, but takes an ARRAY of Data as ARGUMENTS instead of a LIST of Data, after the "this" keyword
// it will take the elements of that ARRAY and pass it into the function
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

// the APPLY Method is NOT THAT USED anymore because we can combine the CALL Method with the SPREAD Operator and get the same result:
book.call(swiss, ...flightData);
console.log(swiss);

///////////////////////////////////////
// 7. The BIND Method
// book.call(eurowings, 23, 'Sarah Williams');
// the BIND Method does NOT immediately CALL the function
// instead, it returns a NEW Function where the "this" keyword is ALWAYS BOUND => we can use the BIND Method to SET the "this" keyword to ANY VALUE we pass into that NEW Function

const bookEW = book.bind(eurowings); // SETING the "this" keyword to "eurowings"
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(12345, "Steven Williams"); // CALLING the NEW Function

// we can even SET the DEFAULT ARGUMENTS of that NEW Function if we want to => the PARTIAL APPLICATION PATTERN:
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Schmedtmann");
bookEW23("Martha Cooper");

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

// this does NOT work
// if we were NOT Using the BIND Method together WITH the Event Listener, the "lufthansa.buyPlane" would point to the "<button class="buy">Buy new plane ✈</button>" and it would NOT return a number:
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// this WORKS - Using the BIND Method WITH Event Listeners:
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
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

/*

 */
