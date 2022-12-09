'use strict';

// Codewars Katas 21 -25:

////////////////////////////////////////
// Using Better Comments Extension:
//  Better Comments Extension Legend
//  * Better Comments Extension Legend
//  ? Better Comments Extension Legend
//  ! Better Comments Extension Legend
//  todo: Better Comments Extension Legend
/** 
@param MyParam the parameter for this method
*/
////////////////////////////////////////

console.log('     ---K21---     ');
/*
* K21: "String ends with?"
Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string).

Examples:
solution('abc', 'bc') // returns true
solution('abc', 'd') // returns false
*/

// function solution(str, ending) {
//   return str.endsWith(ending);
// }

// ! BEST - using Arrow Functions
const solution = (str, ending) => str.endsWith(ending);

console.log(solution('abc', 'bc')); // returns true
console.log(solution('abc', 'd')); // returns false
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K22---     ');
/*
* K22: "Friend or Foe?"
Make a program that filters a list of strings and returns a list with only your friends name in it.
If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours! Otherwise, you can be sure he's not...

Ex: Input = ["Ryan", "Kieran", "Jason", "Yous"], Output = ["Ryan", "Yous"]

i.e.

friend ["Ryan", "Kieran", "Mark"] `shouldBe` ["Ryan", "Mark"]
Note: keep the original order of the names in the output.
*/

// function friend(friends) {
//   return friends.filter((name) => name.length === 4);
// }

// ! BEST - using Arrow Functions
const friend = (friends) => friends.filter((name) => name.length === 4);

console.log(friend(['Ryan', 'Kieran', 'Mark'])); // ["Ryan", "Mark"]
console.log(friend(['Ryan', 'Jimmy', '123', '4', 'Cool Man'])); // ["Ryan"]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K23---     ');
/*
* K23: "Sum without highest and lowest number"
Sum all the numbers of a given array ( cq. list ), except the highest and the lowest element ( by value, not by index! ).
The highest or lowest element respectively is a single element at each edge, even if there are more than one with the same value.
Mind the input validation.

Example
{ 6, 2, 1, 8, 10 } => 16
{ 1, 1, 11, 2, 3 } => 6
Input validation
If an empty value ( null, None, Nothing etc. ) is given instead of an array, or the given array is an empty list or a list with only 1 element, return 0.
*/

// * Radu: Description is vague / wrong. Based on the test, I should exclude the Min and Max items (aka the Min and the Max values)

function sumArray(array) {
  if (array === null || array === undefined || array.length < 3) return 0;

  const min = Math.min(...array);
  const max = Math.max(...array);
  const result = array.reduce((acc, el) => acc + el, 0) - min - max;

  return result;
}
console.log(sumArray(null)); // 0
console.log(sumArray()); // 0
console.log(sumArray([])); // 0
console.log(sumArray([6, 2, 1, 8, 10])); // 16
console.log(sumArray([0, 1, 6, 10, 10])); // 17

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K24---     ');
/*
* K24: "Will there be enough space?"
Bob is working as a bus driver. However, he has become extremely popular amongst the city's residents. With so many passengers wanting to get aboard his bus, he sometimes has to face the problem of not enough space left on the bus! He wants you to write a simple program telling him if he will be able to fit all the passengers.

Task Overview:
You have to write a function that accepts three parameters:
cap is the amount of people the bus can hold excluding the driver.
on is the number of people on the bus excluding the driver.
wait is the number of people waiting to get on to the bus excluding the driver.
If there is enough space, return 0, and if there isn't, return the number of passengers he can't take.

Usage Examples:
cap = 10, on = 5, wait = 5 --> 0 # He can fit all 5 passengers
cap = 100, on = 60, wait = 50 --> 10 # He can't fit 10 of the 50 waiting
*/

// function enough(cap, on, wait) {
// return cap <= on + wait ? Math.abs(cap - on - wait) : 0;
// return Math.max(on + wait - cap, 0);
// }

// ! BEST - using Arrow Functions
const enough = (cap, on, wait) => Math.max(on + wait - cap, 0);

console.log(enough(10, 5, 5)); // 0
console.log(enough(100, 60, 50)); // 10
console.log(enough(20, 5, 5)); // 0

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K25---     ');
/*
* K25: Is he gonna survive?
A hero is on his way to the castle to complete his mission. However, he's been told that the castle is surrounded with a couple of powerful dragons! each dragon takes 2 bullets to be defeated, our hero has no idea how many bullets he should carry.. Assuming he's gonna grab a specific given number of bullets and move forward to fight another specific given number of dragons, will he survive?

Return True if yes, False otherwise :)
*/

// function hero(bullets, dragons) {
//   return bullets - dragons >= dragons ? true : false;
// }

// ! BEST - using Arrow Functions
const hero = (bullets, dragons) =>
  bullets - dragons >= dragons ? true : false;

console.log(hero(10, 5)); // true
console.log(hero(7, 4)); // false
console.log(hero(4, 5)); // false
console.log(hero(100, 40)); // true
console.log(hero(1500, 751)); // false
console.log(hero(0, 1)); // false
