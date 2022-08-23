"use strict";

// CHALLENGE - GENERATE 100 RANDOM dice rolls:
// WRITE A FUNCTION that generates 100 RANDOM dice rolls
let diceRoll;
const diceRolls = function () {
  const randomDiceRolls100 = Array.from({ length: 100 }, (diceRoll, i) => {
    // console.log(`Dice roll #${i + 1}:`);
    diceRoll = Math.trunc(Math.random() * 6) + 1;
    // console.log(`--- Dice rolls a ${diceRoll}`);
    return diceRoll;
  });

  // display the array
  console.log(randomDiceRolls100);

  // display the dice rolls in order
  console.log(`Dice rolls a ${randomDiceRolls100.join(" Dice rolls a ")}`);
  // OR
  // randomDiceRolls100.forEach(function (el, i, arr) {
  //   console.log(`Dice roll #${i + 1}: Dice rolls a ${el}`);
  // });

  return randomDiceRolls100;
};
diceRolls();
