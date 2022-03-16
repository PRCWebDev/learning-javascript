"use strict";

// *** 1. Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// *** 2. Starting conditions
// 2.0. Instead of: ...
/*
// setting both players scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

// hidding the dice image at the beginning of the game
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
*/
// 2.1. ... We need to declare the variables OUTSIDE the "init" function WITHOUT any value and assign values to them INSIDE the "init" function - SCOPING
let scores, currentScore, activePlayer, playing;

// 2.2. Creating an "init" function for the starting conditions to reuse later when the "New game" button is clicked and / or when the page is (re)loaded
const init = function () {
  // SCOPING - the following variables are only available INSIDE the "init" function ("they are SCOPED to the "init" function): ...
  /*
  const scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;
  */
  // ... SO, we need to declare the variables OUTSIDE the "init" function WITHOUT any value and assign values to them INSIDE the "init" function (see 2.1.):
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  // console.log("New game");
};

// 2.3. Calling the "init" function for the game to start
init();

// 2.4. Creating a "switchPlayer" function to reuse later when the rolled dice = 1
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// *** 3. Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 3.1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 3.2. Displaying the dice image
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3.3. Checking for a rolled 1: if true, switch to the other player
    if (dice !== 1) {
      // Adding dice to current score
      currentScore += dice;
      // console.log(currentScore);
      // current0El.textContent = currentScore; // CHANGE LATER - DONE
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching to the other player
      /*
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    */
      switchPlayer(); // calling the "switchPlayer" function instead of copy / pasting the code - respecting DRY principles
      // switching the background to the active player
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 3.4. Adding current score to active player's score
    /*
    scores[0] = scores[0] + currentScore;
    and / or
    scores[1] = scores[1] + currentScore;
    */
    scores[activePlayer] += currentScore;

    // 3.5. Displaying the active player's score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3.6. Checking if the player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finishing the game
      // changing the boolean value of the "playing" variable will make it impossible to execute the "btnRoll.addEventListener("click", function () {...});" and the "btnHold.addEventListener("click", function () {...});" aka clicking the "Roll dice" and "Hold" buttons
      playing = false;
      // hidding the dice image after one of the players wins the game
      diceEl.classList.add("hidden");

      // changing the background color of the winner player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // changing the background color of the loser player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // Switching to the other player
      switchPlayer(); // calling the "switchPlayer" function instead of copy / pasting the code - respecting DRY principles
    }
  }
});

// *** 4. Resetting the game
btnNew.addEventListener("click", init); // the JS engine will call the "init" function as soon as we will click the "New game" button
