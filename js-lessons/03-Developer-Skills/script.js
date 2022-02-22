// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const calcAge = birthyear => 2037 - birthyear;
// console.log('birthyear'); // using "console.log('$1');"
// console.log(birthyear); // using "console.log();"
console.log(calcAge(2000));
*/

/*
///////////////////////////////////////
// Using Google, StackOverflow and MDN

PROBLEM 1:
We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

1) Understanding the problem
--- What is temp amplitude? 
Answer: difference between highest and lowest temp
--- How to compute max and min temperatures?
--- What's a sensor error? And what do do?

2) Breaking up into sub-problems
--- How to ignore errors?
--- Find max value in temp array
--- Find min value in temp array
--- Subtract min from max (amplitude) and return it
*/

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// const calcTempAmplitude = function (temps) {
// --- Find max value in temp array
//   let max = temps[0];
// --- Find min value in temp array
//   let min = temps[0];
//   for (let i = 0; i < temps.length; i++) {
// --- Find max value in temp array
//     if (temps[i] > max) {
//       max = temps[i];
//     }
// --- Find min value in temp array
//     if (temps[i] < min) {
//       min = temps[i];
//     }
//   }
//   console.log(max, min);
// };

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    // --- How to ignore errors?
    if (typeof currentTemp !== 'number') continue; // "continue" === SKIP the current iteration
    // --- Find max value in temp array
    // --- Find min value in temp array
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  // --- Subtract min from max (amplitude) and return it
  return max - min;
};

// calcTempAmplitude([3, 7, 4]); // test
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

/*
PROBLEM 2:
Function should now receive 2 arrays of temps

1) Understanding the problem
--- With 2 arrays, should we implement functionality twice? 
Answer: NO! Just merge 2 arrays

2) Breaking up into sub-problems
--- Merge 2 arrays
*/

const calcTempAmplitudeNew = function (t1, t2) {
  // --- Merge 2 arrays
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
// const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]); // test
const amplitudeNew = calcTempAmplitudeNew(temperatures, [9, 'error', 0, 5, 5]);
console.log(amplitudeNew);
