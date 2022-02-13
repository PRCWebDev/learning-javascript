"use strict";

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

////////////////////////////////////
// LECTURE: Functions Calling Other Functions
const describePopulation = function (country, population) {
  const percentageCountry = percentageOfWorld1(population);
  return `${country} has ${population} million people, which is about ${percentageCountry} % of the world.`;
};
console.log(
  describePopulation("China", 1441),
  describePopulation("Finland", 6),
  describePopulation("Romania", 19),
  describePopulation("New Zealand", 5)
);

////////////////////////////////////
// LECTURE: Introduction to Arrays
const populations = [1441, 6, 19, 5];
console.log(populations.length === 4);
const percentages = [
  percentageOfWorld1(1441),
  percentageOfWorld1(6),
  percentageOfWorld1(19),
  percentageOfWorld1(5),
];
console.log(percentages);
//or
// const percentages = [
//   percentageOfWorld1(populations[0]),
//   percentageOfWorld1(populations[1]),
//   percentageOfWorld1(populations[2]),
//   percentageOfWorld1(populations[3]),
// ];
// console.log(percentages);

////////////////////////////////////
// LECTURE: Basic Array Operations (Methods)
const neighbours = ["Bulgaria", "Serbia", "Hungary", "Moldova", "Ukraine"];
neighbours.push("Utopia");
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Utopia")) {
  console.log("Probably not a central European country");
}

neighbours[neighbours.length - 1] = "Russia"; // selects the last value of the array (which was "Ukraine" after "Utopia" was disolved) and replaces it with "Russia"
// or
// neighbours[neighbours.indexOf("Ukraine")] = "Russia";
console.log(neighbours);

////////////////////////////////////
// LECTURE: Introduction to Objects
const myCountry = {
  country: "Romania",
  capital: "Bucharest",
  language: "romanian",
  population: 19,
  neighbours: ["Bulgaria", "Serbia", "Hungary", "Moldova", "Ukraine"],
};
console.log(myCountry);

////////////////////////////////////
// LECTURE: Dot vs. Bracket Notation
console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`
);
myCountry.population += 2;
console.log(myCountry.population);

myCountry["population"] -= 2;
console.log(myCountry.population);
