"use strict";
// "use strict"; // functions are also BLOCK scoped, BUT ONLY IN STRICT MODE

///////////////////////////////////////
// Scoping in Practice

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  // console.log(firstName);

  function printAge() {
    // const output = `${firstName}, you are ${age} years old, born in ${birthYear}.`;
    // Reasssigning outer scope's variable
    let output = `${firstName}, you are ${age} years old, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Creating a NEW variable with same name as outer scope's variable
      const firstName = "Steven"; // NOT A PROBLEM to use the same variable name for this because IT'S A COMPLETELY DIFFERENT VARIABLE (it's defined in different scope)
      const str = `Oh, you are a millenial, ${firstName}.`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // Reasssigning outer scope's variable
      output = "NEW OUTPUT!";
    }
    // console.log(str); // the "str" variable is BLOCK scoped because it's a CONST / LET variable

    console.log(millenial); // the "millenial" variable is FUNCTION scoped because it's a VAR variable

    // console.log(add(2, 3)); // functions are also BLOCK scoped, BUT ONLY IN STRICT MODE

    console.log(output);
  }
  printAge();

  return age;
}

const firstName = "Jonas";
calcAge(1991);

// ONLY an inner scope can have access to the variables of its outer scope, but not the other way around.
// console.log(age);
// printAge();
