"use strict";
// /*
////////////////////////////////////
// LECTURE: Functions
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and it's capital city is ${capitalCity}.`;
}

const country1 = describeCountry("Finland", 6, "Helsinki");
console.log(country1);

const country2 = describeCountry("Romania", 19, "Bucharest");
console.log(country2);

const country3 = describeCountry("New Zealand", 5, "Wellington");
console.log(country3);

// console.log(country1, country2, country3);

////////////////////////////////////
// LECTURE: Function Declarations vs. Expressions
// Function Declarations
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}
const percentageCountry1 = percentageOfWorld1(6);
const percentageCountry2 = percentageOfWorld1(19);
const percentageCountry3 = percentageOfWorld1(5);
console.log(percentageCountry1, percentageCountry2, percentageCountry3);

// Function Expressions
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};
const percentageCountry4 = percentageOfWorld2(16);
const percentageCountry5 = percentageOfWorld2(119);
const percentageCountry6 = percentageOfWorld2(15);
console.log(percentageCountry4, percentageCountry5, percentageCountry6);

////////////////////////////////////
// LECTURE: Arrow Functions
const percentageOfWorld3 = (population) => (population / 7900) * 100;
console.log(
  percentageOfWorld3(16),
  percentageOfWorld3(119),
  percentageOfWorld3(15)
);
