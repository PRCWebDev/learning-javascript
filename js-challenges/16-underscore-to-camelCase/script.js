'use strict';

// Write a program that receives a string written in underscore_case (aka snake_case) and converts it to a camelCase string.

const underscoreToCamelCase = function (str) {
  const normalizeStrToArr = str.toLowerCase().trim().split('_');
  // console.log(normalizeStrToArr);

  let result = [];

  for (const [i, word] of normalizeStrToArr.entries()) {
    // console.log(i, word);
    i === 0
      ? `${result.push(word)}`
      : `${result.push(word.replace(word[0], word[0].toUpperCase()))}`;

    // OR
    // i === 0
    //   ? `${result.push(word)}`
    //   : `${result.push(
    //       word[0].replace(word[0], word[0].toUpperCase()) + word.slice(1)
    //     )}`;
    // console.log(result);
  }
  console.log(result.join(''));
  return result.join('');
};
underscoreToCamelCase('snake_case_to_camel_case');
underscoreToCamelCase('  Underscore_Case  ');
underscoreToCamelCase('  Underscore_Case++_More_Underscore_Case++  \n');
underscoreToCamelCase(
  '                   Underscore_Case+++_snake_case_to_camel_case+++_More_Underscore_Case+++ \n'
);
