/*
////////////////////////////////////
// LECTURE: Values and Variables
// let country = "Romania";
const country = "Romania";

// let continent = "Europe";
const continent = "Europe";

let population = 19;

console.log(country);
console.log(continent);
console.log(population);


////////////////////////////////////
// LECTURE: Data Types
// let isIsland = false;
const isIsland = false;

// let language;
const language = "romanian";

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);


////////////////////////////////////
// LECTURE: let, const and var
// isIsland = true;


////////////////////////////////////
// LECTURE: Basic Operators
console.log(population / 2);

population++;
console.log(population);
population--;

console.log(population > 6);

console.log(population < 33);

let description =
  country +
  " is in " +
  continent +
  " and it's " +
  population +
  " million people speak " +
  language;
console.log(description);


////////////////////////////////////
// LECTURE: Strings and Template Literals
description = `${country} is in ${continent} and it\'s ${population} million people speak ${language}.`;
console.log(description);


////////////////////////////////////
// LECTURE: Strings and Template Literals
if (population > 33) {
  console.log(`${country}'s population is above average.`);
} else {
  console.log(
    `${country}'s population is ${
      33 - population
    } million people below average.`
  );
}


////////////////////////////////////
// LECTURE: Type Conversion and Coercion
let a = "9" - "5"; // 4
let b = "19" - "13" + "17"; // 6 + "17" = 617
let c = "19" - "13" + 17; // 6 + 17 = 23
let d = 5 + 6 + "4" + 9 - 4 - 2; // 1149 - 4 - 2 = 1143
console.log(a, b, c, d);


////////////////////////////////////
// LECTURE: Equality Operators: == vs. ===

// const numNeighbours = prompt(
//   "How many neighbour countries does your country have?"
// );

// if (numNeighbours == 1) {
//   console.log("Only 1 border");
// } else if (numNeighbours > 1) {
//   console.log("More than 1 border");
// } else {
//   console.log("No borders");
// }

const numNeighbours = Number(
  prompt("How many neighbour countries does your country have?")
);

if (numNeighbours === 1) {
  console.log("Only 1 border");
} else if (numNeighbours > 1) {
  console.log("More than 1 border");
} else {
  console.log("No borders");
}


////////////////////////////////////
// LECTURE: Logical Operators
const country = "Romania";
const language = "romanian";
let population = 19;
const isIsland = false;

if (language === "english" && population < 50 && isIsland === false) {
  // or use '&& !isIsland' instead of '&& isIsland === false'
  console.log(`You should live in ${country} :)`);
} else {
  console.log(`${country} does not meet your criteria :(`);
}


////////////////////////////////////
// LECTURE: The switch Statement
let language = "chinese";
// language = "mandarin";
// language = "spanish";
// language = "english";
// language = "hindi";
// language = "arabic";
language = "romanian";
switch (language) {
  case "chinese":
  case "mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}
*/

////////////////////////////////////
// LECTURE: The Conditional (Ternary) Operator
const country = "Romania";

let population = 19;
// population = 13;
// population = 130;

population > 33
  ? console.log(`${country}'s population is above average.'`)
  : console.log(`${country}'s population is below average.'`);

// OR BETTER
console.log(
  `${country}'s population is ${population > 33 ? "above" : "below"} average`
);
