// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const calcAge = birthyear => 2037 - birthyear;
// console.log('birthyear'); // using "console.log('$1');"
// console.log(birthyear); // using "console.log();"
console.log(calcAge(2000));
*/

///////////////////////////////////////
// Using Google, StackOverflow and MDN
/*
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

///////////////////////////////////////
// --- Debugging with the Console and Breakpoints
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    // B) FIND
    // value: prompt('Degrees celsius:'), // the PROMPT function ALWAYS RETURNS A STRING
    // C) FIX
    value: Number(prompt('Degrees celsius:')),
    // value: 10, // setting the value manually to 10 to keep the tests running in the debugger
  };

  // B) FIND
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};

// A) IDENTIFY
console.log(measureKelvin());

// --- Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  // B) FIND
  // let max = 0;
  // let min = 0;
  // C) FIX
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    // B) FIND
    // debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBug);

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]


1) Understanding the problem
--- Array transformed to string, separated by ...
--- What is the X days? Answer: index + 1

2) Breaking up into sub-problems
--- Transform array into string
--- Transform each element to string with °C
--- Strings needs to contain day (index + 1)
--- Add ... between elements and start and end of string
--- Log string to console
*/

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

console.log(`... ${data1[0]}°C ... ${data1[1]}°C ... ${data1[2]}°C ...`);

const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}°C in ${i + 1} days ... `;
  }
  console.log('... ' + str);
};
printForecast(data1);
