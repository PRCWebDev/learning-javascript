"use strict";

/*
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "Correct Number!";
console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

// ".value" is used for input elements
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

// setting the secret number
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector(".number").textContent = secretNumber;

// setting the score (a STATE variable)
let score = 20;

// this function will be called by the JS engine as soon as the event (the click on the "Check!" button) happens
document.querySelector(".check").addEventListener("click", function () {
  // console.log(document.querySelector(".guess").value);
  /*
  // the result will ALWAYS be a STRING when we log an input from an user interface, NOT a value
  const guess = document.querySelector(".guess").value;
  console.log(guess);
  console.log(typeof guess); 
  */

  // converting the String into a Number
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // checking if we have inputed a Number value
  if (!guess) {
    document.querySelector(".message").textContent = "⛔️ No number!";

    //when player wins
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🎉 Correct Number!";
    // changing the background color and the width when the player wins
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // when guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too high!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game!";
      document.querySelector(".score").textContent = 0;
    }

    // when guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game!";
      document.querySelector(".score").textContent = 0;
    }
  }
});
