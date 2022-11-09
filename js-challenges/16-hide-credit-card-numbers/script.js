'use strict';

// !!! HOW TO HIDE / MASK LAST DIGITS OF A CREDIT CARD !!!

///////////////////////////////////////
// V1 - Jonas - with String Methods
console.log('---V1---');

const maskCreditCardV1 = function (number) {
  // const str = String(number); // converting a Number to a String
  // or
  const str = number + ''; // converting a Number to a String
  const last = str.slice(-3);
  // console.log(last);
  // console.log(number);
  const padded = last.padStart(str.length, '*');

  console.log(padded);
  return padded;
};
maskCreditCardV1(123456789);
maskCreditCardV1('123123');

///////////////////////////////////////
// V2 - Jonas - with String Methods + Array Methods <=> METHOD CHAINING
console.log('---V2---');

const maskCreditCardV2 = function (num) {
  const str = num + '';
  // console.log(str);

  const mask = str
    .toLowerCase()
    .trim()
    .split('')
    .map((digit, index, arr) => (index < arr.length - 3 ? '*' : digit))
    .join('');

  console.log(`Your credit card number is: ${mask}`);
  return mask;
};
maskCreditCardV2(123456789);
maskCreditCardV2('123456789');
maskCreditCardV2('  123456  \n');

///////////////////////////////////////
///////////////////////////////////////
// Accesa custom test
console.log('---Accesa custom test---');
function hideDigits(num) {
  var maskedString = '';
  // Write code that returns markedString as the answer
  maskedString = [];
  for (let i = 0; i < num.length; i++) {
    if (i < num.length - 3) {
      maskedString.push('#');
    } else {
      maskedString.push(num[i]);
    }
  }
  maskedString = maskedString.join('');

  // console.log(maskedString);

  return maskedString;
}
// hideDigits("1234567890");
console.log(hideDigits('1234567890'));
console.log(hideDigits('asdfghjkqqq'));
console.log(hideDigits('aaa'));
