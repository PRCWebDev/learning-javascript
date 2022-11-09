'use strict';

// Codewars Katas 01 - 05:

/* 
K1: 
Sentence Smash
Write a function that takes an array of words and smashes them together into a sentence and returns the sentence. You can ignore any need to sanitize words or add punctuation, but you should add spaces between each word. Be careful, there shouldn't be a space at the beginning or the end of the sentence!

Example:
['hello', 'world', 'this', 'is', 'great']  =>  'hello world this is great'
*/

function smash(words) {
  const sentence = words.join(' ');
  console.log(sentence);
  return sentence;
}
smash(['hello', 'world', 'this', 'is', 'great']); // hello world this is great

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
K2:
We need a function that can transform a string into a number. What ways of achieving this do you know?
Note: Don't worry, all inputs will be strings, and every string is a perfectly valid representation of an integral number.

Examples
"1234" --> 1234
"605"  --> 605
"1405" --> 1405
"-7" --> -7
*/

const stringToNumber = function (str) {
  // put your code here
  console.log(+str, typeof +str);
  return +str;
};
stringToNumber('1234'); // 1234 'number'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
K3:
We need a function that can transform a number (integer) into a string.
What ways of achieving this do you know?

Examples (input --> output):
123  --> "123"
999  --> "999"
-100 --> "-100"
*/

function numberToString(num) {
  // Return a string of the number here!
  console.log(num + '', typeof (num + ''));
  return num + '';
}
numberToString(123); // '123' string

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
K4:
In this simple assignment you are given a number and have to make it negative. But maybe the number is already negative?

Examples
makeNegative(1);    // return -1
makeNegative(-5);   // return -5
makeNegative(0);    // return 0
makeNegative(0.12); // return -0.12
Notes
The number can be negative already, in which case no change is required.
Zero (0) is not checked for any specific sign. Negative zeros make no mathematical sense.
*/

function makeNegative(num) {
  if (num <= 0) {
    console.log(num);
    return num;
  }

  console.log(-num);
  return -num;
}
makeNegative(1); // -1
makeNegative(-5); // -5
makeNegative(0); // 0
makeNegative(0.12); // -0.12

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
K5:
Convert number to reversed array of digits
Given a random non-negative number, you have to return the digits of this number within an array in reverse order.

Example(Input => Output):
35231 => [1,3,2,5,3]
0 => [0]
*/

function digitize(n) {
  //code here
  const convert = String(n).split('').reverse().map(Number);

  // or:
  // const convert = String(n)
  //   .split('')
  //   .reverse()
  //   .map((str) => +str);

  console.log(convert);
  return convert;

  // console.log(str.split('').reverse().join('').split(''));
  // return str.split('').reverse();
}
digitize(35231);
digitize(0);
