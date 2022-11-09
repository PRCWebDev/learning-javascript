'use strict';

// Codewars Katas 06 - 10:

/* 
K6:

Return an array containing the numbers from 1 to N, where N is the parametered value.
Replace certain values however if any of the following conditions are met:
If the value is a multiple of 3: use the value "Fizz" instead
If the value is a multiple of 5: use the value "Buzz" instead
If the value is a multiple of 3 & 5: use the value "FizzBuzz" instead
N will never be less than 1.

Method calling example:

fizzbuzz(3) -->  [1, 2, "Fizz"]
*/

// Return an array
function fizzbuzz(n) {
  //
  let arr = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      arr.push('FizzBuzz');
    } else if (i % 3 === 0) {
      arr.push('Fizz');
    } else if (i % 5 === 0) {
      arr.push('Buzz');
    } else {
      arr.push(i);
    }
  }
  console.log(arr);
  return arr;

  // OR
  // let arr = [];
  // for (let i = 1; i <= n; i++) {
  //   arr.push(i);
  // }
  // const result = arr.map((el) => {
  //   if (el % 3 === 0 && el % 5 === 0) {
  //     return 'FizzBuzz';
  //   } else if (el % 3 === 0) {
  //     return 'Fizz';
  //   } else if (el % 5 === 0) {
  //     return 'Buzz';
  //   } else {
  //     return el;
  //   }
  // });
  // console.log(result);
  // return result;
}
fizzbuzz(15);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
K7:

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
K8:

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
K9:

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
K10:

*/
