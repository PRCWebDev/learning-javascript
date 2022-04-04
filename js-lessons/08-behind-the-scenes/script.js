"use strict";

/*
///////////////////////////////////////
// 1. Scoping in Practice

// "use strict"; // functions are also BLOCK scoped, BUT ONLY IN STRICT MODE

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

// ONLY an inner scope can have access to the variables of it's outer scope, but not the other way around.
// console.log(age);
// printAge();
*/

///////////////////////////////////////
// 2. Hoisting and TDZ in Practice
// 2.1. Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = "Jonas";
// variables declared with VAR are HOISTED to the value of "undefined"

let job = "teacher";
const year = 1991;
// variables declared with LET and / or CONST are NOT HOISTED & they are placed in TDZ(Temporal Dead Zone)

// 2.2. Functions
console.log(addDecl(2, 3));

// console.log(addExpr(2, 3));
console.log(addExpr);

// console.log(addArrow(2, 3));
console.log(addArrow);

// 2.2.1. Function Declaration - ONLY THIS WORKS!
function addDecl(a, b) {
  return a + b;
}
// function declarations are HOISTED and CAN BE CALLED before declaring them

// 2.2.2. Function Expression - NOT WORKING
// const addExpr = function (a, b) {
//   return a + b;
// };
// functions expressions declared with LET and / or CONST are NOT HOISTED & they are placed in TDZ(Temporal Dead Zone)

var addExpr = function (a, b) {
  return a + b;
};
// functions expressions declared with VAR are HOISTED to the value of "undefined", BUT WE CANNOT CALL THEM because "undefined" is NOT a function

// 2.2.3. Arrow Function - NOT WORKING
// const addArrow = (a, b) => a + b;
// arrow functions declared with LET and / or CONST are NOT HOISTED & they are placed in TDZ(Temporal Dead Zone)

var addArrow = (a, b) => a + b;
// arrow functions declared with VAR are HOISTED to the value of "undefined", BUT WE CANNOT CALL THEM because "undefined" is NOT a function

// *** Example - !WHY WE SHOULD NOT USE VAR!
// variables declared with VAR are HOISTED to the value of "undefined"
// "undefined" is a FALSY VALUE (aka 0) which will make the "deleteShoppingCart()" function execute (because 0 != 10) and delete all products in the cart
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

///////////////////////////////////////
// 99. Variables on the Global Window Object
// !! variables declared with VAR WILL create a PROPERTY on the Global Window Object (in the Browser: Global Object = Window Object)
// variables declared with LET and / or CONST WILL NOT create a PROPERTY on the Global Window Object (in the Browser: Global Object = Window Object) !!
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

///////////////////////////////////////
// 3. The "this" keyword in Practice
// 3.1. The "this" keyword in the GLOBAL SCOPE is the WINDOW OBJECT (aka the Global Object, aka the Global Window Object)
console.log(this);

// 3.2. The "this" keyword in a SIMPLE FUNCTION CALL is:
// - "undefined" - ONLY IN STRICT MODE
// (- the WINDOW OBJECT (aka the Global Object, aka the Global Window Object) - in "sloppy mode" that we SHOULD NOT USE anyway)
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1991);

// 3.3. ARROW FUNCTIONS DO NOT GET !!THEIR OWN!! "this" keyword
// Instead, the "this" keyword in ARROW FUNCTIONS is the LEXICAL "this" keyword which means that it uses the "this" keyword of it's parent function or of it's parent scope (in this case, the WINDOW OBJECT (aka the Global Object, aka the Global Window Object))
const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1980);

// 3.4. The "this" keyword in a OBJECT METHOD is the !!OBJECT!! THAT IS CALLING THE METHOD (in this case, the "jonas" Object
// => the "jonas" Object is the "owner" of the "calcAge()" function in which the "this" keyword is used)
// an OBJECT METHOD = a FUNCTION ATTACHED to the OBJECT
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

// METHOD BORROWING = "borrowing" / copying a METHOD from one OBJECT to another
const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;

matilda.calcAge();
// this example illustates that the "this" keyword in a OBJECT METHOD POINTS TO !!OBJECT!! THAT IS CALLING THE METHOD - the "matilda" Object, in this case, that "borrowed" / copied the "calcAge()" method / function from the "jonas" Object

const borrowedMethod = jonas.calcAge;
console.log(borrowedMethod);
// borrowedMethod(); // this returns: 1. "undefined" because it's just another SIMPLE FUNCTION CALL IN STRICT MODE and 2. an error because there is no Object declared for the "this" keyword to point to ("Uncaught TypeError: Cannot read properties of undefined (reading 'year') at calcAge")

///////////////////////////////////////
// 4. Regular Functions vs. Arrow Functions
// var firstName = "Matilda"; // - the "this" keyword in Arrow Functions works with VAR - see 99.
// console.log(firstName);
// const firstName = "Matilda"; // - the "this" keyword in Arrow Functions DOES NOT WORK with LET and / or CONST - see 99.
// console.log(firstName);

const jonasJr = {
  firstName: "JonasJr", // Object Property
  year: 1991, // Object Property
  calcAge: function () {
    // Object Property + Function = Method - see 3.4.
    // this WORKS because the "this" keyword in a OBJECT METHOD POINTS TO !!OBJECT!! THAT IS CALLING THE METHOD
    // console.log(this);
    console.log(2037 - this.year);

    /*
    const isMillenial = function () {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); // this returns "undefined" because it's a SIMPLE FUNCTION CALL IN STRICT MODE (even though it happens inside of a method) - see 3.2.
    */
    /*
    // Solution 1 - OLDER solution BEFORE ES6 - using an EXTRA variable ("self" or "that") OUTSIDE of the function
    const self = this; // self or that
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial(); // this returns the "jonasJr" Object + "true" because "self.year" = "this.year" = "jonasJr.year" = 1991 which is between 1981 and 1996
    */

    // Solution 2 - NEWER solution AFTER ES6 - using an ARROW FUNCTION
    // this WORKS because an Arrow Function DOES NOT HAVE !!IT'S OWN!! "this" keyword and IT WILL USE IT'S PARENT "this" keyword - see 3.3.
    const isMillenial = () => {
      // arrow function - see 3.3.
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); // this returns the "jonasJr" Object + "true" because "this.year" = "jonasJr.year" = 1991 which is between 1981 and 1996

    // Just another test
    /*
    const test = () => {
      // arrow function - see 3.3.
      console.log(this);
      console.log("Just another test");
    };
    test();
    */
  },

  // WRONG WAY - with ARROW FUNCTIONS
  /*
  greet: () => {
    // ! this ("greet:") is JUST ANOTHER OBJECT PROPERTY (that has a FUNCTION ATTACHED to it => A METHOD) OF THE "jonasJr" Object (like "firstName:", "year:" and "calcAge:" )
    console.log(`Hey, ${this.firstName}!`); // "this.firstName" = "window.firstName"
    console.log(this);
  },
  */
  // GOOD WAY -  with REGULAR FUNCTIONS
  greet: function () {
    // Object Property + Function = Method - see 3.4.
    console.log(`Hey, ${this.firstName}!`);
    console.log(this);
  },
};
jonasJr.greet();
// WRONG WAY - with ARROW FUNCTIONS => this returns "Hey, undefined!" because: 1. see 3.3. - ARROW FUNCTIONS DO NOT GET !!THEIR OWN!! "this" keyword and 2. it's parent scope is the WINDOW OBJECT (aka the Global Object, aka the Global Window Object) because "jonasJr" IS NOT A CODE BLOCK, BUT AN OBJECT LITERAL(just a way that we literally define Objects) SO "this.firstName" points OUTSIDE the "jonasJr" Object, TO the WINDOW OBJECT, where is NOT DEFINED ("undefined") because a variable declared with LET and / or CONST WILL NOT create a PROPERTY on the Global Window Object (in the Browser: Global Object = Window Object) - see 99.
// GOOD WAY -  with REGULAR FUNCTIONS => this returns "Hey, JonasJr!" + the "jonasJr" Object

jonasJr.calcAge(); // 46
// this WORKS because the "this" keyword in a OBJECT METHOD POINTS TO !!OBJECT!! THAT IS CALLING THE METHOD - see 3.4.
// console.log(this.firstName);

///////////////////////////////////////
// 5. The "arguments" keyword in Practice
// REGULAR FUNCTIONS - WORKS
const addExpr2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr2(2, 5);
addExpr2(2, 5, 8, 12); // IT'S COMPLETELY LEGAL TO CALL MORE ARGUMENTS THAN THE PARAMETERS WE PREVIOUSLY DECLARED in the function

// ARROW FUNCTIONS - DOES NOT WORK
var addArrow2 = (a, b) => {
  console.log(arguments);
  return a + b;
};
// addArrow2(2, 5, 8); // ILLEGAL - DOES NOT WORK

/*
*** ! CONCLUSION FOR BEST PRACTICES ! 
1. DO NOT use VAR for declaring variables - USE LET and / or CONST instead
2. Declare the VARIABLES AT THE TOP of each scope
3. ALWAYS DECLARE ALL THE FUNCTIONS FIRST and USE them AFTER the declaration - this applies to ALL types of functions, even to Function Declarations (which are HOISTED)
4. NEVER, EVER USE an ARROW FUNCTION !!AS A METHOD (Object Method)!! - USE a REGULAR FUNCTION INSTEAD
*/

///////////////////////////////////////
// Objects vs. primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const mee = {
  name: "Jonas",
  age: 30,
};
const friend = mee;
friend.age = 27; // ALL REFERENCE TYPES VALUES DECLARED WITH CONST IN OBJECTS ARE !!MUTABLE!!, unlike IN PRIMITIVES TYPES, WHERE ALL VALUES DECLARED WITH CONST ARE !!IMMUTABLE!! (const in PRIMITIVE TYPES = IMMUTABLE vs const in REFERENCE TYPES = MUTABLE)
console.log("Friend:", friend);
console.log("Me", mee);

///////////////////////////////////////
// Primitives vs. Objects in Practice

// Primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica);
console.log("After marriage: ", marriedJessica);
// marriedJessica = {}; - this DOES NOT WORK with CONST, IT WORKS ONLY with LET and it would create a NEW EMPTY OBJECT
/*
let marriedJessica = jessica;
marriedJessica.lastName = "Davis";
marriedJessica = {};
console.log("Before marriage:", jessica);
console.log("After marriage: ", marriedJessica);
*/

// Copying objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2); // this Method of copying Objects is SHALLOW and only modifies the Object on a surface level, not on a DEEP level. We need a more complex Method to copy Objects that we will learn later on...
jessicaCopy.lastName = "Davis"; // this works on a SHALLOW level, NOT on a DEEP level
// console.log("Before marriage:", jessica2);
// console.log("After marriage: ", jessicaCopy);

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
// this also modifies the original "jessica2" Object - exemplifies that "Object.assign" DOES NOT WORK ON A DEEP LEVEL

console.log("Before marriage:", jessica2);
console.log("After marriage: ", jessicaCopy);
