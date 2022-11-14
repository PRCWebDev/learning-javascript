'use strict';

// Codewars Katas 16 - 20:

console.log('     ---K16---     ');
/* 
K16:
Grasshopper - Summation:
Write a program that finds the summation of every number from 1 to num. The number will always be a positive integer greater than 0.

For example:
summation(2) -> 3
1 + 2

summation(8) -> 36
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8
*/
const summation = function (num) {
  // Code here
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }

  return sum;
};
console.log(summation(2)); // 3
console.log(summation(8)); // 36

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K17---     ');
/*
K17:
Shortest Word:
Simple, given a string of words, return the length of the shortest word(s).
String will never be empty and you do not need to account for different data types.
*/
function findShort(s) {
  const sToArr = s.split(' ').map((word) => word.length);
  const shortestWord = Math.min(...sToArr);
  return shortestWord;
}
console.log(findShort('bitcoin take over the world maybe who knows perhaps')); // 3
console.log(
  findShort(
    'turns out random test cases are easier than writing out basic ones'
  )
); // 3
console.log(findShort("Let's travel abroad shall we")); // 2
