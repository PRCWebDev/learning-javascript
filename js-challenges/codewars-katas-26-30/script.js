'use strict';

// Codewars Katas 26 - 30:

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

console.log('     ---K26---     ');
/*
* K26: "DNA to RNA Conversion"
Deoxyribonucleic acid, DNA is the primary information storage molecule in biological systems. It is composed of four nucleic acid bases Guanine ('G'), Cytosine ('C'), Adenine ('A'), and Thymine ('T').

Ribonucleic acid, RNA, is the primary messenger molecule in cells. RNA differs slightly from DNA its chemical structure and contains no Thymine. In RNA Thymine is replaced by another nucleic acid Uracil ('U').

Create a function which translates a given DNA string into RNA.

For example:
"GCAT"  =>  "GCAU"
The input string can be of arbitrary length - in particular, it may be empty. All input is guaranteed to be valid, i.e. each input string will only ever consist of 'G', 'C', 'A' and/or 'T'.
*/

// function DNAtoRNA(dna) {
//   return dna.replace(/T/g, 'U'); // OLD Version of ".replaceAll();"
//   return dna.replaceAll('T', 'U');
// }

// ! BEST - using Arrow Functions
const DNAtoRNA = (dna) => dna.replaceAll('T', 'U');

console.log(DNAtoRNA('TTTT')); // "UUUU"
console.log(DNAtoRNA('GCAT')); // "GCAU"
console.log(DNAtoRNA('GACCGCCGCC')); // "GACCGCCGCC"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K27---     ');
/*
* K27: "Remove the minimum"
The museum of incredible dull things
The museum of incredible dull things wants to get rid of some exhibitions. Miriam, the interior architect, comes up with a plan to remove the most boring exhibitions. She gives them a rating, and then removes the one with the lowest rating.

However, just as she finished rating all exhibitions, she's off to an important fair, so she asks you to write a program that tells her the ratings of the items after one removed the lowest one. Fair enough.

Task
Given an array of integers, remove the smallest value. Do not mutate the original array/list. If there are multiple elements with the same value, remove the one with a lower index. If you get an empty array/list, return an empty array/list.

Don't change the order of the elements that are left.

Examples
Input: [1,2,3,4,5], output = [2,3,4,5]
Input: [5,3,2,1,4], output = [5,3,2,4]
Input: [2,2,1,2,1], output = [2,2,2,1]
*/

function removeSmallest(numbers) {
  // if (numbers.length < 1) return [];

  const min = Math.min(...numbers);

  const indexMin = numbers.findIndex((el) => el === min);

  const result = numbers.filter((el, i, arr) => i !== indexMin);
  return result;
}

// ! BEST - using Arrow Functions
// const removeSmallest = (numbers) =>
//   numbers.filter(
//     (el, i, arr) => i !== numbers.findIndex((el) => el === Math.min(...numbers))
//   );

console.log(removeSmallest([])); // []
console.log(removeSmallest([1, 2, 3, 4, 5])); // [2,3,4,5]
console.log(removeSmallest([5, 3, 2, 1, 4])); // [5,3,2,4]
console.log(removeSmallest([2, 2, 1, 2, 1])); // [2,2,2,1]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K28---     ');
/*
! K28: "Find the stray number"
You are given an odd-length array of integers, in which all of them are the same, except for one single number.

Complete the method which accepts such an array, and returns that single different number.

The input array will always be valid! (odd-length >= 3)

Examples
[1, 1, 2] ==> 2
[17, 17, 3, 17, 17, 17, 17] ==> 3
*/

// function stray(numbers) {
//   return numbers.find((el) => numbers.indexOf(el) === numbers.lastIndexOf(el));
// }

// ! BEST - using Arrow Functions
const stray = (numbers) =>
  numbers.find((el) => numbers.indexOf(el) === numbers.lastIndexOf(el));

console.log(stray([1, 1, 2])); // 2
console.log(stray([1, 2, 1])); // 2
console.log(stray([2, 1, 1])); // 2

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K29---     ');
/*
* K29: "Area or Perimeter"
You are given the length and width of a 4-sided polygon. The polygon can either be a rectangle or a square.
If it is a square, return its area. If it is a rectangle, return its perimeter.

Example(Input1, Input2 --> Output):
6, 10 --> 32
3, 3 --> 9
Note: for the purposes of this kata you will assume that it is a square if its length and width are equal, otherwise it is a rectangle.
*/

// const areaOrPerimeter = function (l, w) {
//   return l === w ? l * w : 2 * l + 2 * w;
// };

// ! BEST - using Arrow Functions
const areaOrPerimeter = (l, w) => (l === w ? l * w : 2 * l + 2 * w);

console.log(areaOrPerimeter(3, 3)); // 9
console.log(areaOrPerimeter(6, 10)); // 32

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('     ---K30---     ');
/*
! K30: "Opposites Attract"
Timmy & Sarah think they are in love, but around where they live, they will only know once they pick a flower each. If one of the flowers has an even number of petals and the other has an odd number of petals it means they are in love.

Write a function that will take the number of petals of each flower and return true if they are in love and false if they aren't.
*/

// function lovefunc(flower1, flower2) {
//   if (flower1 % 2 === 0 && flower2 % 2 !== 0) return true;
//   if (flower1 % 2 !== 0 && flower2 % 2 === 0) return true;
//   return false;
// }

// ! BEST - using Arrow Functions
const lovefunc = (flower1, flower2) => flower1 % 2 !== flower2 % 2;
// * OR
// const lovefunc = (flower1, flower2) =>
//   (flower1 + flower2) % 2 !== 0 ? true : false;

console.log(lovefunc(1, 4)); // true
console.log(lovefunc(2, 2)); // false
console.log(lovefunc(0, 1)); // true
