'use strict';

// Codewars Katas  31 - 35:

////////////////////////////////////////
// Using Better Comments Extension - Better Comments Extension Legend:
//  * Better Comments Extension Legend
//  ? Better Comments Extension Legend
//  ! Better Comments Extension Legend
//  todo: Better Comments Extension Legend
/** 
@param MyParam the parameter for this method
*/
////////////////////////////////////////

console.log('     ---K31---     ');
/*
! K31: "Extract the domain name from a URL"
Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. 

For example:
url = "http://github.com/carbonfive/raygun" -> domain name = "github"
url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
url = "https://www.cnet.com"                -> domain name = cnet"
*/

function domainName(url) {
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.replace('www.', '');

  return url.split('.')[0];
}

console.log(domainName('http://google.com')); // "google"
console.log(domainName('http://google.co.jp')); // "google"
console.log(domainName('www.xakep.ru')); // "xakep"
console.log(domainName('https://youtube.com')); // "youtube"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K32---     ');
/*
! K32: "The observed PIN" - TOO ADVANCED FOR ME ATM - solution copied from others
Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

The keypad has the following layout:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
    │ 0 │
    └───┘
He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

(*) possible in sense of: the observed PIN itself and all variations considering the adjacent digits

Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java/Kotlin and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

Detective, we are counting on you!
*/
// TODO: TOO ADVANCED FOR ME ATM
// function getPINs(observed) {
//   // TODO: This is your job, detective!
// }

// ? V1
/*
const digits = [
  [0, 8],
  [1, 2, 4],
  [1, 2, 3, 5],
  [2, 3, 6],
  [1, 4, 5, 7],
  [2, 4, 5, 6, 8],
  [3, 5, 6, 9],
  [4, 7, 8],
  [5, 7, 8, 9, 0],
  [6, 8, 9],
];

const getPINs = (observed) =>
  observed
    .split('')
    .reduce(
      (all, digit) =>
        digits[digit].reduce(
          (cs, c) => [...cs, ...all.map((a) => `${a}${c}`)],
          []
        ),
      ['']
    );

console.log(getPINs('8')); // ["5", "7", "8", "9", "0"]
console.log(getPINs('11')); // ["11", "22", "44", "12", "21", "14", "41", "24", "42"]
console.log(getPINs('369')); // ["339","366","399","658","636","258","268","669","668","266","369","398","256","296","259","368","638","396","238","356","659","639","666","359","336","299","338","696","269","358","656","698","699","298","236","239"]
*/

// ? V2
/*
function getPINs(observed) {
  return observed
    .split('')
    .map(
      (t) =>
        ({
          0: ['0', '8'],
          1: ['1', '2', '4'],
          2: ['1', '2', '3', '5'],
          3: ['2', '3', '6'],
          4: ['1', '4', '5', '7'],
          5: ['2', '4', '5', '6', '8'],
          6: ['3', '5', '6', '9'],
          7: ['4', '7', '8'],
          8: ['5', '7', '8', '9', '0'],
          9: ['6', '8', '9'],
        }[t])
    )
    .reduce((pre, cur) =>
      [].concat.apply(
        [],
        pre.map((t) => cur.map((g) => t + g))
      )
    );
}


console.log(getPINs('8')); // ["5", "7", "8", "9", "0"]
console.log(getPINs('11')); // ["11", "22", "44", "12", "21", "14", "41", "24", "42"]
console.log(getPINs('369')); // ['236', '238', '239', '256', '258', '259', '266', '268', '269', '296', '298', '299', '336', '338', '339', '356', '358', '359', '366', '368', '369', '396', '398', '399', '636', '638', '639', '656', '658', '659', '666', '668', '669', '696', '698', '699']
*/

// TODO - V2 EXPLANATIONS:
/*
@ https://www.codewars.com/kata/5263c6999e0f40dee200059d/solutions/javascript

"Assume the observed number is '369' So, first we split the observed pin number to get an array: ['3','6','9'] That array is then mapped over the object that has the numbers and the variations to give an array of arrays: [[ '2', '3', '6' ], [ '3', '5', '6', '9' ], [ '6', '8', '9' ]]

Those arrays are then getting reduced, so it takes the first array and the second array and adds each of the values together in another array of arrays. [[23, 25, 26, 29], [33, 35, 36, 39], [63, 65, 66, 69]]

Apply() applies a function over any given arguments, which basically lets you repeat the function over and over again. So, concat.apply() will concat all arrays given into one big array. [23, 25, 26, 29, 33, 35, 36, 39, 63, 65, 66, 69] This becomes the new pre, and the reduce continues, with cur becoming the next array, ['6', '8', '9'] this again becomes an array of arrays,that is then concatenated all together to form one array that is then returned which provides the answer.

Hope this helps!"
*/

// TODO - V2 EXTRA - EXPLANATIONS:
// * "cool solution, but you don't need apply, you can use flat() instead, and the runTime will reduce from ~5ms / 100 calls to ~3ms / 100 calls."
// * "Like this: .reduce((pre, cur)=> [].concat(pre.map(t => cur.map(g => t + g)).flat()));"

// ! RADU - REVERSE ENGINEERING from V2:

function getPINs(observed) {
  const possibleCombos = {
    1: ['1', '2', '4'],
    2: ['1', '2', '3', '5'],
    3: ['2', '3', '6'],
    4: ['1', '4', '5', '7'],
    5: ['2', '4', '5', '6', '8'],
    6: ['3', '5', '6', '9'],
    7: ['4', '7', '8'],
    8: ['5', '7', '8', '9', '0'],
    9: ['6', '8', '9'],
    0: ['0', '8'],
  };

  /*
  // "Assume the "observed" number is '369'. So, first we split the "observed" pin number to get an array: ['3','6','9'] "
  const step2 = observed.split('');
  console.log(step2); //

  // "That array is then mapped over the object that has the numbers and the variations to give an array of arrays: [[ '2', '3', '6' ], [ '3', '5', '6', '9' ], [ '6', '8', '9' ]]"
  const step3 = step2.map((digit) => possibleCombos[digit]);
  console.log(step3); // [[ '2', '3', '6' ], [ '3', '5', '6', '9' ], [ '6', '8', '9' ]]
  // pt '8' combinatia va fi => ['5', '7', '8', '9', '0']

  // "Those arrays are then getting reduced, so it takes the first array and the second array and adds each of the values together in another array of arrays."
  // ! Radu - using "flatMap();" instead of "concat.apply()"
  const step4 = step3.reduce((previousArr, currentArr) =>
    previousArr.flatMap((previousArrElement) =>
      currentArr.map(
        (currentArrElement) => previousArrElement + currentArrElement
      )
    )
  );
  // console.log(step4);

  return step4;
  */

  // ! BEST - using Arrow Functions - HARD TO READ
  // /*
  return observed
    .split('')
    .map((digit) => possibleCombos[digit])
    .reduce((previousArr, currentArr) =>
      previousArr.flatMap((previousArrElement) =>
        currentArr.map(
          (currentArrElement) => previousArrElement + currentArrElement
        )
      )
    );
  // */
}

// const obj = { 1: ['2'], true: 'asd', fff: false, 2: 222 };
// console.log(obj[true]);

// console.log(getPINs('8')); // ["5", "7", "8", "9", "0"]
// console.log(getPINs('11')); // ["11", "22", "44", "12", "21", "14", "41", "24", "42"]
console.log(getPINs('369')); // ['236', '238', '239', '256', '258', '259', '266', '268', '269', '296', '298', '299', '336', '338', '339', '356', '358', '359', '366', '368', '369', '396', '398', '399', '636', '638', '639', '656', '658', '659', '666', '668', '669', '696', '698', '699']

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K33---     ');
/*
* K33: "Create Phone Number"
Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.
*/
// function evenOrOdd(number) {}

// ! BEST - using Arrow Functions
const evenOrOdd = (number) => (number % 2 !== 0 ? 'Odd' : 'Even');

console.log(evenOrOdd(-42)); // Even
console.log(evenOrOdd(7)); // Odd
console.log(evenOrOdd(0)); // Even

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K34---     ');
/*
* K34: "Even or Odd"
Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
The returned format must be correct in order to complete this challenge.

Don't forget the space after the closing parentheses!
*/
// function createPhoneNumber(numbers) {}

// ! BEST - using Arrow Functions
const createPhoneNumber = (numbers) =>
  `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers
    .slice(6)
    .join('')}`;

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])); //  "(123) 456-7890"
console.log(createPhoneNumber([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])); //  "(111) 111-1111"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K35---     ');
/*
* K35: "Invert values"
Given a set of numbers, return the additive inverse of each. Each positive becomes negatives, and the negatives become positives.

invert([1,2,3,4,5]) == [-1,-2,-3,-4,-5]
invert([1,-2,3,-4,5]) == [-1,2,-3,4,-5]
invert([]) == []
You can assume that all values are integers. Do not mutate the input array/list.
*/

// function invert(array) {
//    return ;
// }

// ! BEST - using Arrow Functions
const invert = (array) => array.map((el) => -el);

console.log(invert([1, 2, 3, 4, 5])); // [-1,-2,-3,-4,-5]
console.log(invert([1, -2, 3, -4, 5])); // [-1,2,-3,4,-5]
console.log(invert([])); // []
