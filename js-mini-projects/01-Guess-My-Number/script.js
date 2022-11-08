'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// ".value" is used for input elements
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
  document.querySelector('.message').textContent = 'Correct Number!';
});
*/

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// v1 - Code with all the comments
/*
// *** 1. Setting the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Displaying the secret number
// document.querySelector('.number').textContent = secretNumber;

// *** 2. Setting the score (a STATE variable)
let score = 20;

// *** 3. Setting the highscore
let highscore = 0;

// *** 6. Refactoring the code using DRY principles
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const lowerTheScore = function () {
  score--;
  document.querySelector('.score').textContent = score;
};

const youLostTheGame = function () {
  document.querySelector('.score').textContent = 0;
  document.querySelector('body').style.backgroundColor = '#830404';
};

// *** 4. Adding the click event
// this function will be called by the JS engine as soon as the event (the click on the "Check!" button) happens
document.querySelector('.check').addEventListener('click', function () {
  // console.log(document.querySelector('.guess').value);
  // the result will ALWAYS be a STRING when we log an input from an user interface, NOT a value
  // const guess = document.querySelector('.guess').value;
  // console.log(guess);
  // console.log(typeof guess);

  // converting the String into a Number
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // checking if we have inputed a Number value
  if (!guess) {
    // Refactoring the code using DRY principles
    // document.querySelector('.message').textContent = '⛔️ No number!';
    displayMessage('⛔️ No number!');

    // when player wins
  } else if (guess === secretNumber) {
    // Refactoring the code using DRY principles
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');
    // displaying the secret number
    document.querySelector('.number').textContent = secretNumber;
    // changing the background color and the width when the player wins
    // (JavaScript DOES NOT ALLOW "kebab-case" code writting style for CSS styling / manipulation, we MUST USE ONLY "camelCase" style)
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // displaying the highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // Refactoring the code using DRY principles
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? 'Too high!' : 'Too low!';
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      // Refactoring the code using DRY principles
      // score--;
      // document.querySelector('.score').textContent = score;
      lowerTheScore();
    } else {
      // Refactoring the code using DRY principles
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('💥 You lost the game!');
      // Refactoring the code using DRY principles
      // document.querySelector('.score').textContent = 0;
      // document.querySelector('body').style.backgroundColor = '#830404';
      youLostTheGame();
    }
  }
});

// *** 5. Resetting the game with the "Again" button
document.querySelector('.again').addEventListener('click', function () {
  // resetting / reassigning the secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // resetting / reassigning the score
  score = 20;
  document.querySelector('.score').textContent = score;
  // resetting / reassigning the message
  // Refactoring the code using DRY principles
  // document.querySelector('.message').textContent = 'Start guessing...!';
  displayMessage('Start guessing...');
  // resetting / reassigning the number displayed
  document.querySelector('.number').textContent = '?';
  // resetting / reassigning the input value to an empty value
  document.querySelector('.guess').value = '';

  // resetting / reassigning the CSS styles
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
*/

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// v2 - Code without some of the comments
console.log('test');

// /*
// *** 1. Setting the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// Displaying the secret number
// document.querySelector('.number').textContent = secretNumber;

// *** 2. Setting the score (a STATE variable)
let score = 20;

// *** 3. Setting the highscore
let highscore = 0;

// *** 6. Refactoring the code using DRY principles
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const lowerTheScore = function () {
  score--;
  document.querySelector('.score').textContent = score;
};

const youLostTheGame = function () {
  document.querySelector('.score').textContent = 0;
  document.querySelector('body').style.backgroundColor = '#830404';
};

// *** 4. Adding the click event
document.querySelector('.check').addEventListener('click', function () {
  // converting the String into a Number
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // checking if we have inputed a Number value
  if (!guess) {
    displayMessage('⛔️ No number!');

    // when player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    // displaying the secret number
    document.querySelector('.number').textContent = secretNumber;
    // changing the background color and the width when the player wins
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // displaying the highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    // when guess is wrong
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      lowerTheScore();
    } else {
      displayMessage('💥 You lost the game!');
      youLostTheGame();
    }
  }
});

// *** 5. Resetting the game with the "Again" button
document.querySelector('.again').addEventListener('click', function () {
  // resetting / reassigning the secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // resetting / reassigning the score
  score = 20;
  document.querySelector('.score').textContent = score;

  // resetting / reassigning the message
  displayMessage('Start guessing...');

  // resetting / reassigning the number displayed
  document.querySelector('.number').textContent = '?';

  // resetting / reassigning the input value to an empty value
  document.querySelector('.guess').value = '';

  // resetting / reassigning the CSS styles
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
// */
