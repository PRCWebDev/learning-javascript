"use strict";

///////////////////////////////////////
// Coding Challenge #19

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (dogAges) {
  // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
  const humanAges = dogAges.map((dogAge) =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAges);

  // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  const adultDogs = humanAges.filter((dogAge) => dogAge >= 18);
  console.log(adultDogs);

  // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  // THIS WOULD NOT WORK in CHAINING Methods because we DON'T HAVE the "adultDogs" Array anywhere and we CAN'T KNOW its length:
  // const calcAverageAge =
  //   adultDogs.reduce((acc, dogAge) => acc + dogAge, 0) / adultDogs.length;
  // OR BEST for CHAINING Methods:
  // // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5
  const calcAverageAge = adultDogs.reduce(
    (acc, dogAge, i, arr) => acc + dogAge / arr.length,
    0
  );
  console.log(calcAverageAge);
  return calcAverageAge;
};

// 4. Run the function for both test datasets
// TEST DATA 1:
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// TEST DATA 2:
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
