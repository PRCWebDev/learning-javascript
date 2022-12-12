'use strict';

// Codewars Katas  36 - 40:

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

console.log('     ---K36---     ');
/*
! K36: "Bit Counting"
Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case
*/

// var countBits = function (n) {};

// ! BEST - using Arrow Functions
const countBits = (n) =>
  n
    .toString(2)
    .split('')
    .map((el) => +el)
    .reduce((acc, el) => acc + el, 0);

console.log(countBits(0)); // 0
console.log(countBits(4)); // 1
console.log(countBits(10)); // 2
console.log(countBits(7)); // 3

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K37---     ');
/*
! K37: "Who likes it?"
You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:
[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
Note: For 4 or more names, the number in "and 2 others" simply increases.
*/

// /*
function likes(names) {
  return {
    0: `no one likes this`,
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
  }[Math.min(names.length, 4)];
}
// */

// ! BEST - using Arrow Functions
// ? V1:
/*
const likes = ([a, b, c, ...others]) =>
  a === undefined
    ? 'No one likes this.'
    : b === undefined
    ? `${a} likes this.`
    : c === undefined
    ? `${a} and ${b} like this.`
    : others.length === 0
    ? `${a}, ${b} and ${c} like this.`
    : `${a}, ${b} and ${[c, ...others].length} others like this.`;
*/

// ? V2:
/*
const likes = ([a, b, ...c]) =>
  c.length > 1
    ? `${a}, ${b} and ${c.length} others like this`
    : c.length
    ? `${a}, ${b} and ${c[0]} like this`
    : b
    ? `${a} and ${b} like this`
    : a
    ? `${a} likes this`
    : `no one likes this`;
*/

// ? V3:
// const likes = (names) => {
//   return {
//     0: `no one likes this`,
//     1: `${names[0]} likes this`,
//     2: `${names[0]} and ${names[1]} like this`,
//     3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
//     4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
//   }[Math.min(names.length, 4)];
// };

console.log(likes([])); // "no one likes this"
console.log(likes(['Peter'])); // "Peter likes this"
console.log(likes(['Jacob', 'Alex'])); // "Jacob and Alex like this"
console.log(likes(['Max', 'John', 'Mark'])); // "Max, John and Mark like this"
console.log(likes(['Alex', 'Jacob', 'Mark', 'Max'])); // "Alex, Jacob and 2 others like this"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K38---     ');
/*
! K38: "Find the odd int"
Given an array of integers, find the one that appears an odd number of times.
There will always be only one integer that appears an odd number of times.

Examples:
[7] should return 7, because it occurs 1 time (which is odd).
[0] should return 0, because it occurs 1 time (which is odd).
[1,1,2] should return 2, because it occurs 1 time (which is odd).
[0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
[1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).
*/

// ? V1:
function findOdd(A) {
  const map = new Map();
  for (let i = 0; i < A.length; i++) {
    !map.has(A[i]) ? map.set(A[i], 1) : map.set(A[i], map.get(A[i]) + 1); // map.get(A[i]) = GETS the VALUE of the KEY named "A[i]" in the map
  }
  // console.log(map);

  for (let [key, value] of map) {
    if (value % 2 !== 0) return key;
  }
}
// ////////////////////

// ? V2:
/*
  function findOdd(A) {
    let odd = {};

    for (let i = 0; i < A.length; i++) {
      if (odd[A[i]]) {
        odd[A[i]]++;
      } else {
        odd[A[i]] = 1;
      }
    }
    // console.log(odd);

    for (let [key, value] of Object.entries(odd)) {
      // if (value % 2 !== 0) return key; // typeof "key" = string => MUST CONVERT to Number:
      if (value % 2 !== 0) return +key; // "+key" = number
    }
  }
  */

console.log(findOdd([7])); // 7
console.log(findOdd([0])); // 0
console.log(findOdd([1, 1, 2])); // 2
console.log(findOdd([0, 1, 0, 1, 0])); // 0
console.log(findOdd([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1])); // 4

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K39---     ');
/*
! K39: "Coding Meetup #1 - Higher-Order Functions Series - Count the number of JavaScript developers coming from Europe"
You will be given an array of objects (hashes in ruby) representing data about developers who have signed up to attend the coding meetup that you are organizing for the first time.

Your task is to return the number of JavaScript developers coming from Europe.

For example, given the following list:
var list1 = [
  { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'JavaScript' },
  { firstName: 'Maia', lastName: 'S.', country: 'Tahiti', continent: 'Oceania', age: 28, language: 'JavaScript' },
  { firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML' },
  { firstName: 'Sumayah', lastName: 'M.', country: 'Tajikistan', continent: 'Asia', age: 30, language: 'CSS' }
];
your function should return number 1.

If, there are no JavaScript developers from Europe then your function should return 0.

Notes:
The format of the strings will always be Europe and JavaScript.
All data will always be valid and uniform as in the example above.
*/

// function countDevelopers(list) {
//   let arr = [];
//   list.forEach((el) => {
//     if (el.language === 'JavaScript') arr.push(el.continent);
//   });
//   // console.log(arr);

//   let count = 0;
//   arr.forEach((el) => {
//     if (el === 'Europe') count++;
//   });
//   // console.log(count);

//   return count;
// }

// ! BEST - using Arrow Functions
const countDevelopers = (list) =>
  list.filter((el) => el.language === 'JavaScript' && el.continent === 'Europe')
    .length;

console.log(
  countDevelopers([
    {
      firstName: 'Noah',
      lastName: 'M.',
      country: 'Switzerland',
      continent: 'Europe',
      age: 19,
      language: 'JavaScript',
    },
    {
      firstName: 'Maia',
      lastName: 'S.',
      country: 'Tahiti',
      continent: 'Oceania',
      age: 28,
      language: 'JavaScript',
    },
    {
      firstName: 'Shufen',
      lastName: 'L.',
      country: 'Taiwan',
      continent: 'Asia',
      age: 35,
      language: 'HTML',
    },
    {
      firstName: 'Sumayah',
      lastName: 'M.',
      country: 'Tajikistan',
      continent: 'Asia',
      age: 30,
      language: 'CSS',
    },
  ])
);
console.log(
  countDevelopers([
    {
      firstName: 'Oliver',
      lastName: 'Q.',
      country: 'Australia',
      continent: 'Oceania',
      age: 19,
      language: 'HTML',
    },
    {
      firstName: 'Lukas',
      lastName: 'R.',
      country: 'Austria',
      continent: 'Europe',
      age: 89,
      language: 'HTML',
    },
  ])
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K40---     ');
/*
! K40: "Coding Meetup #2 - Higher-Order Functions Series - Greet developers"
You will be given an array of objects (associative arrays in PHP, tables in COBOL) representing data about developers who have signed up to attend the next coding meetup that you are organizing.

Your task is to return an array where each object will have a new property 'greeting' with the following string value:
Hi < firstName here >, what do you like the most about < language here >?

For example, given the following input array:

var list1 = [
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' } 
];
*/

// ? V1:
function greetDevelopers(list) {
  // ? V1.1:
  // list.forEach(function (developer) {
  //   developer.greeting = `Hi ${developer.firstName}, what do you like the most about ${developer.language}?`;
  // });

  // return list;

  // ? OR V1.2 (using "map();" instead of "forEach();"):
  // ! BEST - using Arrow Functions
  list.map(
    (developer) =>
      (developer.greeting = `Hi ${developer.firstName}, what do you like the most about ${developer.language}?`)
  );

  // !!! VERY IMPORTANT - USE "return" HERE, NOT BEFORE and / or INSIDE "list.map();" !!!
  return list;
}

// const obj = {
//   firstName: 'Sofia',
//   language: 'Java',
// };
// obj.greeting = `Hi ${obj.name}, what do you like the most about ${obj.language}?`;
// console.log(obj);

// ? V2 - using Arrow Functions:
/*
const greetDevelopers = (list) =>
  list.map((arrObj) =>
    Object.assign(arrObj, {
      greeting: `Hi ${arrObj.firstName}, what do you like the most about ${arrObj.language}?`,
    })
  );
*/

console.log(
  greetDevelopers([
    {
      firstName: 'Sofia',
      lastName: 'I.',
      country: 'Argentina',
      continent: 'Americas',
      age: 35,
      language: 'Java',
    },
    {
      firstName: 'Lukas',
      lastName: 'X.',
      country: 'Croatia',
      continent: 'Europe',
      age: 35,
      language: 'Python',
    },
    {
      firstName: 'Madison',
      lastName: 'U.',
      country: 'United States',
      continent: 'Americas',
      age: 32,
      language: 'Ruby',
    },
  ])
);
