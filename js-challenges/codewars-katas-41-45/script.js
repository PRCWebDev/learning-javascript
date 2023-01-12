'use strict';

// Codewars Katas  41 - 45:

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

console.log('     ---K41---     ');
/*
! K41: "Reversed Words"
Complete the solution so that it reverses all of the words within the string passed in.
Words are separated by exactly one space and there are no leading or trailing spaces.

Example(Input --> Output):
"The greatest victory is that which requires no battle" --> "battle no requires which that is victory greatest The"
*/

/*
function reverseWords(str) {
  return str.split(' ').reverse().join(' '); // reverse those words
}
*/
// ! BEST - using Arrow Functions
const reverseWords = (str) => str.split(' ').reverse().join(' ');

console.log(
  reverseWords('The greatest victory is that which requires no battle')
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K42---     ');
/*
! K42: "Stop gninnipS My sdroW!"
Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed (Just like the name of this Kata). Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.

Examples:
spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
spinWords( "This is a test") => returns "This is a test" 
spinWords( "This is another test" )=> returns "This is rehtona test"
*/

/*
function spinWords(string) {
  //TODO Have fun :)
  return string
    .split(' ')
    .map((el) => (el.length >= 5 ? el.split('').reverse().join('') : el))
    .join(' ');
}
*/

// ! BEST - using Arrow Functions
const spinWords = (string) =>
  string
    .split(' ')
    .map((el) => (el.length >= 5 ? el.split('').reverse().join('') : el))
    .join(' ');

console.log(spinWords('Hey fellow warriors')); // "Hey wollef sroirraw"
console.log(spinWords('This is a test')); // "This is a test"
console.log(spinWords('This is another test')); // "This is rehtona test"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K43---     ');
/*
! K43: ""

*/

// ! BEST - using Arrow Functions

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K44---     ');
/*
! K44: ""

*/

// ! BEST - using Arrow Functions

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K45---     ');
/*
! K45: ""

*/

// ! BEST - using Arrow Functions
