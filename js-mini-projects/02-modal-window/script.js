"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

// console.log(btnsOpenModal);

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   console.log(btnsOpenModal[i].textContent);
// }

// *** 1. Displaying / opening the modal window and the overlay
/*
// 1 - V1
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", function () {
    console.log(`Button ${i + 1} clicked`);
    modal.classList.remove("hidden"); // this is the same as:
    // modal.style.display = "block";
    overlay.classList.remove("hidden");
  });
}
*/

// 1 - V2 - BETTER
const openModal = function () {
  console.log("Show modal button clicked");
  modal.classList.remove("hidden"); // this is the same as:
  // modal.style.display = "block";
  overlay.classList.remove("hidden");
};

// displaying / opening the modal window and the overlay
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}
// we DON'T call the function, we just instruct the JS engine to call the function once the "click" happens

// *** 2. Hidding / closing the modal window and the overlay
/*
// 2 - V1
btnCloseModal.addEventListener("click", function () {
  console.log("Modal closed");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// hidding / closing the overlay
overlay.addEventListener("click", function () {
  console.log("Clicked outside of the modal window to close the modal window");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
*/

// 2 - V2 - BETTER
const closeModal = function () {
  console.log("Close modal button clicked");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// hidding / closing the modal window
btnCloseModal.addEventListener("click", closeModal); // we DON'T call the function, we just instruct the JS engine to call the function once the "click" happens

// hidding / closing the overlay
overlay.addEventListener("click", closeModal); // we DON'T call the function, we just instruct the JS engine to call the function once the "click" happens

// *** 3. Handling an "Esc" Keypress Event
document.addEventListener("keydown", function (e) {
  // console.log("A key was pressed");
  // console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    console.log(e.key);
    closeModal();
  }
});
