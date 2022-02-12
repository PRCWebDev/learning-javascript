"use strict";

const calcTip = function (bill) {
  const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  return tip;
};

// or
// const calcTip = (bill) =>
//   bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

// test bill = 100
console.log(calcTip(100));

const bills = [125, 555, 44];
console.log(bills);
// const tips = [calcTip(125), calcTip(555), calcTip(44)];
// or
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

// bonus
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(totals);

// or
console.log(bills, tips, totals);
