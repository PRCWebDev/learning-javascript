"use strict";

const mark = {
  fullname: "Mark Miller",
  weight: 78,
  // weight: 58,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  fullname: "John Smith",
  weight: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.weight / this.height ** 2;
    return this.bmi;
  },
};

const higherBMI =
  mark.calcBMI() > john.calcBMI()
    ? `${mark.fullname}'s BMI (${mark.bmi}) is higher than ${john.fullname}'s BMI (${john.bmi})`
    : `${john.fullname}'s BMI (${john.bmi}) is higher than ${mark.fullname}'s BMI (${mark.bmi})`;

console.log(higherBMI);
