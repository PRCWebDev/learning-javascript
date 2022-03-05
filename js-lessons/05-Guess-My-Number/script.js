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

// *** 1. Setting the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Displaying the secret number
// document.querySelector(".number").textContent = secretNumber;

// *** 2. Setting the score (a STATE variable)
let score = 20;

// *** 3. Setting the highscore
let highscore = 0;

// *** 6. Refactoring the code using DRY principles
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// *** 4. Adding the click event
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
    // Refactoring the code using DRY principles
    // document.querySelector(".message").textContent = "⛔️ No number!";
    displayMessage("⛔️ No number!");

    // when player wins
  } else if (guess === secretNumber) {
    // Refactoring the code using DRY principles
    // document.querySelector(".message").textContent = "🎉 Correct Number!";
    displayMessage("🎉 Correct Number!");
    // displaying the secret number
    document.querySelector(".number").textContent = secretNumber;
    // changing the background color and the width when the player wins
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // displaying the highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // Refactoring the code using DRY principles
      // document.querySelector(".message").textContent = guess > secretNumber ? "Too high!" : "Too low!";
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // Refactoring the code using DRY principles
      // document.querySelector(".message").textContent = "💥 You lost the game!";
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
  /*
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
  */
});

// *** 5. Resetting the game with the "Again" button
document.querySelector(".again").addEventListener("click", function () {
  // resetting / reassigning the secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // resetting / reassigning the score
  score = 20;
  document.querySelector(".score").textContent = score;
  // resetting / reassigning the message
  // Refactoring the code using DRY principles
  // document.querySelector(".message").textContent = "Start guessing...!";
  displayMessage("Start guessing...");
  // resetting / reassigning the number displayed
  document.querySelector(".number").textContent = "?";
  // resetting / reassigning the input value to an empty value
  document.querySelector(".guess").value = "";

  // resetting / reassigning the CSS styles
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
