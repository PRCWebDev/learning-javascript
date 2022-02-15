"use strict";

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  bestFriends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  // hasDriversLicense: false,

  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age;
  },

  // V1 - Radu
  // getSummary: function () {
  //   this.getSummary = `${this.firstName} ${this.lastName} is a ${
  //     this.age
  //   } years old ${this.job}. He has ${
  //     this.bestFriends.length
  //   } best friends called ${this.bestFriends[0]}, ${this.bestFriends[1]} and ${
  //     this.bestFriends[2]
  //   }, and ${
  //     this.hasDriversLicense
  //       ? "a valid driver's license"
  //       : "no valid driver's license"
  //   }.`;
  //   return this.getSummary;
  // },

  // OR V2 - Adapted from Jonas
  // CALLING / RUNNING the "calcAge" function inside the "getSummary" function (inside the Template Literal)
  // and using a TERNARY OPERATOR inside the "getSummary" function (inside the Template Literal)
  getSummary: function () {
    return `${this.firstName} ${
      this.lastName
    } is a ${this.calcAge()} years old ${this.job}. He has ${
      this.bestFriends.length
    } best friends called ${this.bestFriends[0]}, ${this.bestFriends[1]} and ${
      this.bestFriends[2]
    }, and ${
      this.hasDriversLicense
        ? "a valid driver's license"
        : "no valid driver's license"
    }.`;
  },
};

// Challenge #7
// Using OBJECTS AND METHODS, log to the console: "Jonas Schmedtmann is a 31 years old teacher. He has a 3 best friends called Michael, Peter and Steven and a valid driver's license."

// V1 - Radu
// jonas.calcAge(); // CALLING the "calcAge" function
// jonas.getSummary(); // CALLING the "getSummary" function
// console.log(jonas.getSummary); // Displaying to the console

// OR V2 - Adapted from Jonas
console.log(jonas.getSummary()); // CALLING the "getSummary" function AND Displaying to the console
