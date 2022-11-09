'use strict';

///////////////////////////////////////
// Coding Challenge #18

// Write a Function that GETS / EXTRACTS the Maximum Value from an Array and displays it to the console.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
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
const getMaxValue = function (arr) {
  const maxValue = arr.reduce((acc, mov) => (acc > mov ? acc : mov), arr.at(0));

  console.log(maxValue);
  return maxValue;
};
getMaxValue(movements);
getMaxValue([1, 2, 3, 4, 0, -1]);

// Write a Function that GETS / EXTRACTS the Minimum Value from an Array and displays it to the console.
const getMinValue = function (arr) {
  const minValue = arr.reduce((acc, mov) => (acc < mov ? acc : mov), arr.at(0));

  console.log(minValue);
  return minValue;
};
getMinValue(movements);
getMinValue([1, 2, 3, 4, 0, -1]);

// Write a Function that GETS / EXTRACTS both the Maximum Value and the Minimum Value from an Array and displays it the console.
const getMinMaxValuesV1 = function (arr) {
  const minValue = arr.reduce((acc, mov) => (acc < mov ? acc : mov), arr[0]);

  const maxValue = arr.reduce((acc, mov) => (acc > mov ? acc : mov), arr.at(0));

  console.log(minValue, maxValue);
  return minValue, maxValue;
};
getMinMaxValuesV1(movements);
getMinMaxValuesV1([1, 2, 3, 4, 0, -1]);

// OR
const getMinMaxValuesV2 = function (arr) {
  const minValue = Math.min(...arr);

  const maxValue = Math.max(...arr);

  console.log(minValue, maxValue);
  return minValue, maxValue;
};
getMinMaxValuesV2(movements);
getMinMaxValuesV2([1, 2, 3, 4, 0, -1]);
