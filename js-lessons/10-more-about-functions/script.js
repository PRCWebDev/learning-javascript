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

// High-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// JS uses CALLBACK Functions all the time
const high5 = function () {
  console.log("👋");
};
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);
