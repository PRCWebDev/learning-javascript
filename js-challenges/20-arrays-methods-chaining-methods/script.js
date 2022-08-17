"use strict";

///////////////////////////////////////
// Coding Challenge #20

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
const calcAverageHumanAge = (dogAges) => {
  const calcAverageAge = dogAges
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter((dogAge) => dogAge >= 18)
    .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);
  // using the OTHER METHOD ("adultDogs.reduce((acc, dogAge) => acc + dogAge, 0) / adultDogs.length;") WOULD NOT WORK in CHAINING Methods because we DON'T HAVE the "adultDogs" Array anywhere and we CAN'T KNOW its length
  console.log(calcAverageAge);
  return calcAverageAge;
};

// 4. Run the function for both test datasets
// TEST DATA 1:
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// TEST DATA 2:
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
