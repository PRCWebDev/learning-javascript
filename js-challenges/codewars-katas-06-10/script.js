'use strict';

// Codewars Katas 06 - 10:

console.log('     ---K6---     ');
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

console.log('     ---K7---     ');
/*
K7:
Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.
Examples:
"This is an example!" ==> "sihT si na !elpmaxe"
"double  spaces"      ==> "elbuod  secaps"
*/
function reverseWords(str) {
  // Go for it
  const reverseStr = str
    .split(' ')
    .map((word) => word.split('').reverse().join(''))
    .join(' ');

  console.log(reverseStr);
  return reverseStr;
}
reverseWords('This is an example!');
reverseWords('double  spaces');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K8---     ');
/*
K8:
DESCRIPTION:
Complete the solution so that it reverses the string passed into it.
'world'  =>  'dlrow'
'word'   =>  'drow'
*/
function solution(str) {
  const reversedWord = str.split('').reverse().join('');

  console.log(reversedWord);
  return reversedWord;
}
solution('world');
solution('word');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K9---     ');
/*
K9:
DESCRIPTION:
Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word. For simplicity, you'll have to capitalize each word, check out how contractions are expected to be in the example below.

Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

Example:
Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
*/
String.prototype.toJadenCase = function () {
  //...
  return this.split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
};
console.log("How can mirrors be real if our eyes aren't real".toJadenCase());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K10---     ');
/*
K10:
Code as fast as you can! You need to double the integer and return it.
*/

function doubleInteger(i) {
  // i will be an integer. Double it and return it.
  console.log(i * 2);
  return i * 2;
}
doubleInteger(2);
doubleInteger(5);
