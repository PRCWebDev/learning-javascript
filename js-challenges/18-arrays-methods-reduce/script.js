"use strict";

///////////////////////////////////////
// Coding Challenge #18

/* 
Write a Function that GETS / EXTRACTS the Maximum Value from an Array and display it to the console.
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// GETTING the Maximum Value from an Array
/*
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements.at(0));
*/
// OR using the Conditional Ternary Operator
const maxValue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements.at(0)
);
console.log(maxValue);
