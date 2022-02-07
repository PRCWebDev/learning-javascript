// const weightMark = 78;
// const heightMark = 1.69;
const weightMark = 95;
const heightMark = 1.88;
const bmiMark = weightMark / heightMark ** 2;

// const weightJohn = 92;
// const heightJohn = 1.95;
const weightJohn = 85;
const heightJohn = 1.76;
const bmiJohn = weightJohn / heightJohn ** 2;

const markHigherBMI = bmiMark > bmiJohn;

console.log(bmiMark, bmiJohn, markHigherBMI);
