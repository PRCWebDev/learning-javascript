"use strict";

// !!! HOW TO REVERSE A STRING USING A FUNCTION !!!
// V1 - DETAILED version
const reverseString = function (str) {
  const stringToArray = str.split(""); // Step 1: CONVERT the String to an Array
  const reverseArray = stringToArray.reverse(); // Step 2: REVERSE that Array
  const arrayBackToString = reverseArray.join(""); // Step 3: CONVERT the REVERSED Array BACK to a String
  console.log(arrayBackToString); // display to the console
  return arrayBackToString; // execute function
};

reverseString("string 123"); // CALL function
// console.log(reverseString("string 123")); // WITHOUT using "console.log(arrayToString);" inside the "reverseString" function
reverseString("123456789");
reverseString("this is just a test");
reverseString("tset a tsuj si siht");

// OR
// V2 - FASTER version
const reverseString2 = function (str) {
  const anyString = str.split("").reverse().join("");
  console.log(anyString);
  return anyString;
};

reverseString2("this is another test");
reverseString2("tset rehtona si siht");
reverseString2("9876543210");

// OR
// WITHOUT using a function:
console.log("WITHOUT using a function:".split("").reverse().join(""));
console.log("Any String".split("").reverse().join(""));
console.log("gnirtS ynA".split("").reverse().join(""));
