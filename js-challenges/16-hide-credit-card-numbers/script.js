"use strict";

// !!! HOW TO HIDE / MASK LAST DIGITS OF A CREDIT CARD !!!

///////////////////////////////////////
// V1 - Jonas
console.log("---V1---");

const maskCreditCard = function (number) {
  // const str = String(number); // converting a Number to a String
  // or
  const str = number + ""; // converting a Number to a String
  const last = str.slice(-3);
  // console.log(last);
  // console.log(number);
  const padded = last.padStart(str.length, "*");
  console.log(padded);
  return padded;
};
maskCreditCard(123456789);
maskCreditCard("123123");

///////////////////////////////////////
// V2 - Accesa test
console.log("---V2---");

function hideDigits(num) {
  var maskedString = "";
  // Write code that returns markedString as the answer
  maskedString = [];
  for (let i = 0; i < num.length; i++) {
    if (i < num.length - 3) {
      maskedString.push("#");
    } else {
      maskedString.push(num[i]);
    }
  }
  maskedString = maskedString.join("");

  // console.log(maskedString);

  return maskedString;
}
// hideDigits("1234567890");
console.log(hideDigits("1234567890"));
console.log(hideDigits("asdfghjkqqq"));
console.log(hideDigits("aaa"));
