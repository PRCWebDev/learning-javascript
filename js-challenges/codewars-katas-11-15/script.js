'use strict';

// Codewars Katas 11 - 15:

console.log('     ---K11---     ');
/* 
K11:
Anagram Detection:
DESCRIPTION:
An anagram is the result of rearranging the letters of a word to produce a new word (see wikipedia).
Note: anagrams are case insensitive
Complete the function to return true if the two arguments given are anagrams of each other; return false otherwise.

Examples
"foefet" is an anagram of "toffee"
"Buckethead" is an anagram of "DeathCubeK"
*/
const isAnagram = function (test, original) {
  return (
    test.toLowerCase().split('').sort().join() ===
    original.toLowerCase().split('').sort().join()
  );
};
console.log(isAnagram('foefet', 'toffee'));
console.log(isAnagram('Buckethead', 'DeathCubeK'));
console.log(isAnagram('racecar', 'AcerRCC'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K12---     ');
/*
K12:
Highest and Lowest:
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

Examples
highAndLow("1 2 3 4 5");  // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"

Notes:
All numbers are valid Int32, no need to validate them.
There will always be at least one number in the input string.
Output string must be two numbers separated by a single space, and highest number is first.
*/
function highAndLow(numbers) {
  // ...
  const strToArr = numbers.split(' ').map((num) => +num);
  // console.log(strToArr);
  const minNum = strToArr.reduce(
    (acc, num) => (acc < num ? acc : num),
    strToArr[0]
  );
  const maxNum = strToArr.reduce(
    (acc, num) => (acc > num ? acc : num),
    strToArr[0]
  );
  // console.log(maxNum, minNum, typeof minNum);
  const result = [maxNum, minNum].join(' ');

  console.log(result, typeof result);
  return result;
}
highAndLow('1 2 3 4 5'); // "5 1"
highAndLow('1 2 -3 4 5'); // "5 -3"
highAndLow('1 9 3 4 -5'); // "9 -5"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K13---     ');
/*
K13:
Beginner - Reduce but Grow:
Given a non-empty array of integers, return the result of multiplying the values together in order.

Example:
[1, 2, 3, 4] => 1 * 2 * 3 * 4 = 24
*/
function grow(x) {
  return x.reduce((acc, num) => acc * num, 1);
}
console.log(grow([1, 2, 3, 4])); // 24
console.log(grow([4, 1, 1, 1, 4])); // 16
console.log(grow([2, 2, 2, 2, 2, 2])); // 64

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K14---     ');
/*
K14:
Keep Hydrated!:
Nathan loves cycling.
Because Nathan knows it is important to stay hydrated, he drinks 0.5 litres of water per hour of cycling.
You get given the time in hours and you need to return the number of litres Nathan will drink, rounded to the smallest value.

For example:
time = 3 ----> litres = 1
time = 6.7---> litres = 3
time = 11.8--> litres = 5
*/
function litres(time) {
  return Math.floor(time * 0.5);
}
console.log(litres(3)); // 1
console.log(litres(6.7)); // 3
console.log(litres(11.8)); // 5

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K15---     ');
/*
K15:

*/
function addBinary(a, b) {
  return (a + b).toString(2);
}
console.log(addBinary(1, 1));
console.log(addBinary(5, 9));
/*
// EXPLANATION: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
Number.prototype.toString()
The toString() method returns a string representing the specified number value.

Syntax
toString()
toString(radix)

Parameters
radix (Optional)
An integer in the range 2 through 36 specifying the base to use for representing the number value.
Defaults to 10.

Return value
A string representing the specified number value.
*/
console.log((10 ** 21.5).toString()); // "3.1622776601683794e+21" // DECIMAL - baza 10 - DEFAULT (radix === 10)
console.log((10 ** 21.5).toString(8)); // "526665530627250154000000" // baza 8 (radix === 8)
console.log((10 ** 21.5).toString(2)); // "101010110110110101101011000110010111010101000001101100000000000000000000" // BINARY - baza 2 (radix === 2)
