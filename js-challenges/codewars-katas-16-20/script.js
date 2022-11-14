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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K18---     ');
/*
K18:
Rock Paper Scissors!
Let's play! You have to return which player won! In case of a draw return Draw!.

Examples(Input1, Input2 --> Output):
"scissors", "paper" --> "Player 1 won!"
"scissors", "rock" --> "Player 2 won!"
"paper", "paper" --> "Draw!"
*/
const rps = (p1, p2) => {
  if (p1 === 'scissors' && p2 === 'paper') return 'Player 1 won!';
  if (p1 === 'paper' && p2 === 'rock') return 'Player 1 won!';
  if (p1 === 'rock' && p2 === 'scissors') return 'Player 1 won!';

  if (p2 === 'scissors' && p1 === 'paper') return 'Player 2 won!';
  if (p2 === 'paper' && p1 === 'rock') return 'Player 2 won!';
  if (p2 === 'rock' && p1 === 'scissors') return 'Player 2 won!';

  return 'Draw!';
};
console.log(rps('scissors', 'paper')); // "Player 1 won!"
console.log(rps('scissors', 'rock')); // "Player 2 won!"
console.log(rps('paper', 'paper')); // "Draw!"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K19---     ');
/*
K19:
Basic Mathematical Operations:
Your task is to create a function that does four basic mathematical operations.
The function should take three arguments - operation(string/char), value1(number), value2(number).
The function should return result of numbers after applying the chosen operation.

Examples(Operator, value1, value2) --> output
('+', 4, 7) --> 11
('-', 15, 18) --> -3
('*', 5, 5) --> 25
('/', 49, 7) --> 7
*/
function basicOp(operation, value1, value2) {
  // Code
  if (operation === '+') return value1 + value2;
  if (operation === '-') return value1 - value2;
  if (operation === '*') return value1 * value2;
  if (operation === '/') return value1 / value2;
}
console.log(basicOp('+', 4, 7)); // 11
console.log(basicOp('-', 15, 18)); // -3
console.log(basicOp('*', 5, 5)); // 25
console.log(basicOp('/', 49, 7)); // 7

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K20---     ');
/*
K20:
Grasshopper - Personalized Message:
Create a function that gives a personalized greeting. This function takes two parameters: name and owner.

Use conditionals to return the proper message:
case         	          return
name equals owner	      'Hello boss'
otherwise	              'Hello guest'
*/
function greet(name, owner) {
  // Add code here
  return name === owner ? 'Hello boss' : 'Hello guest';
}
console.log(greet('Daniel', 'Daniel')); // 'Hello boss'
console.log(greet('Greg', 'Daniel')); // 'Hello guest'
