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
    // displayMessage('⛔️ No number!');
  }

  // document.querySelector(".message").textContent = "Correct Number!";
});
