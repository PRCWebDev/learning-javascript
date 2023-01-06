'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 0. Radu - Extra:
const obj1 = {};

// ADDING a (NEW) PROPERTY (+ Value) to an Object:
obj1.firstName = 'Dan';
obj1.age = 33;
// OR:
obj1['sex'] = 'male'; // MUST HAVE '' INSIDE [] for Strings

// obj1['arr'] = [1, 2, 3, 4, 5];
// OR
// obj1.arr = [1, 2, 3, 4, 5];

// obj1[1] = 101;
// obj1[true] = true;

console.log(obj1); // {firstName: 'Dan', age: 33, sex: 'male'}

// DELETING a PROPERTY (+ Value) from an Object:
delete obj1.age;
// OR
// delete obj1['age'];
console.log(obj1); // {firstName: 'Dan', sex: 'male'}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. Prototypal Inheritance / Delegation IN JAVASCRIPT
const num = [1, 2, 3];
console.log(num.map((el) => el * 2)); // (3) [2, 4, 6]

console.log(num); // [1, 2, 3] =>
/*
0: 1 
1: 2
2: 3
length: 3
[[Prototype]]: Array(0)
*/
// "Array.prototype" is the PROTOTYPE of ALL Array OBJECTS we create in JavaScript => (because of the Prototypal Inheritance / Delegation) ALL Arrays HAVE ACCESS and  CAN USE the ".map()" method  => that is why the "num" Array can also ACCESS and USE the ".map()" method (even though it does not have that method explicitly written / declared inside of "num")
//

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2. Constructor Functions AND the "new" Operator:
// USING a Constructor Function AND the "new" Operator === A WAY / TECHNIQUE / PATTERN of BUILDING / CREATING a NEW OBJECT PROGRAMMATICALLY which WILL ALSO SET THE PROTOTYPE OBJECT of the NEWLY CREATED OBJECT

///////////////////////////////////////
// 2.1. OOP CONVENTION: a Constructor Function ALWAYS START with a CAPITAL letter (litera Mare)

///////////////////////////////////////
// 2.2. we can ONLY USE Function Declarations and / or Function Expressions as Constructor Functions => we CANNOT use Arrow Functions as Constructor Functions because they DO NOT get their own "this" keyword

///////////////////////////////////////
// 2.3. a Constructor Function === a completely Normal / Regular function
// The only difference between a Regular / Normal function and a Constructor Function is that we CALL a Constructor Function USING the "new" Operator

///////////////////////////////////////
// 2.4. HOW CALLING a Constructor Function USING the "new" Operator WORKS:
/*
WHEN we CALL a Constructor Function USING the "new" Operator, behind the scenes, 4 steps are happening:
1. a NEW EMPTY OBJECT "{}" is CREATED (ex: the "jonas" Object)
2. "this" = "{}" <=> the Function is called and, in this function call, the "this" keyword WILL BE SET / WILL POINT TO the NEWLY CREATED EMPTY OBJECT "{}" (from 1.)
3. "{}" IS LINKED TO THE PROTOTYPE OBJECT (BY CREATING the "__proto__" Property AND SETTING its VALUE to the "prototype" Property of the Constructor Function that is being CALLED => see 3.4.)
// 
4. the Constructor Function WILL AUTOMATICALLY RETURN the NEWLY CREATED EMPTY OBJECT "{}" (from 1.)
*/

/*
// EX:
const Person = function (firstName, birthYear) {
  console.log(this); // Person {} === (a NEW EMPTY OBJECT "{}" OF THE TYPE "Person") <=> [[Prototype]]: Object => constructor: ƒ (firstName, birthYear) + [[Prototype]]: Object
};
new Person('Jonas', 1991);
*/

///////////////////////////////////////
// 2.5. BUILDING / CREATING an OBJECT USING a Constructor Function AND the "new" Operator IN PRACTICE:
/*
BECAUSE of how CALLING a Constructor Function USING the "new" Operator WORKS =>
=> the "this" keyword WILL basically BE RETURNED =>
=> WHATEVER WE ADD (properties and / or methods) TO that NEWLY CREATED EMPTY OBJECT "{}" (from 1.) / the "this" keyword, WILL then BE RETURNED from that Constructor Function =>
=> that RETURNED OBJECT (NOT EMPTY ANYMORE) === the OBJECT we are BUILDING / CREATING PROGRAMMATICALLY (while ALSO SETTING THE PROTOTYPE OBJECT of the RETURNED OBJECT)

// !!! THIS is HOW Built-in Objects like Arrays, Maps and /or Sets ARE actually IMPLEMENTED / CREATED in JavaScript !!!
*/
// console.log(Object.prototype);
console.log(Array.prototype);
console.log(Map.prototype);
console.log(Set.prototype);

// /*
// EX:
const Person = function (firstName, birthYear) {
  // INSTANCE Properties:
  this.firstName = firstName;
  this.birthYear = birthYear;

  // !!! BAD PRACTICE - INSTEAD ADD a METHOD to the Constructor's "prototype" Property TO USE PROTOTYPAL INHERITANCE / DELEGATION (see 3.1.) !!!
  /*
  // NEVER ADD METHODS TO the Constructor Functions => because it will be PASSED ON to ALL the OBJECTS / INSTANCES of the "Person" PROTOTYPE OBJECT
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
  */
};

const jonas = new Person('Jonas', 1991);
console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991} <=> the RETURNED OBJECT (with 2 NEW properties ("firstName: 'Jonas'" and "birthYear: 1991")) we are BUILDING / CREATING OF THE TYPE "Person" => "Person" is the PROTOTYPE OBJECT OF the "jonas" (RETURNED) OBJECT
// */

// !!! NOW we can use this Constructor Function ("Person") to create as many DIFFERENT Objects as we want:
const mathilda = new Person('Mathilda', 2017);
console.log(mathilda); // Person {firstName: 'Mathilda', birthYear: 2017}

const jack = new Person('Jack', 1975);
console.log(jack); // Person {firstName: 'Jack', birthYear: 1975}

///////////////////////////////////////
// 2.6. IN JAVASCRIPT, Constructor Functions are used to SIMULATE TRADITIONAL / CLASSICAL OOP CLASSES =>
// => 1. the RETURNED OBJECTS ("jonas", "mathilda" and "jack") ARE INSTANCES of "Person"
// => 2. the properties of the RETURNED OBJECTS ("jonas", "mathilda" and "jack") ARE INSTANCE Properties
// PROOF:
console.log(jonas instanceof Person); // true
console.log(mathilda instanceof Person); // true
console.log(jack instanceof Person); // true

const jay = 'Jay';
console.log(jay instanceof Person); // false
// => !!! 3. NEVER ADD METHODS TO the Constructor Functions => because they will be PASSED / COPIED INTO ALL the OBJECTS / INSTANCES of the "Person" PROTOTYPE OBJECT - BAD PRACTICE !!! => INSTEAD ADD a METHOD to the Constructor's "prototype" Property TO USE PROTOTYPAL INHERITANCE / DELEGATION (see 3.1.) !!!

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 3. Prototypes:
///////////////////////////////////////
// 3.1. ADDING a METHOD to the Constructor's "prototype" Property:
// EACH and EVERY Function in JavaScript (INCLUDING Constructor Functions) automatically has a Property called "prototype"
// EVERY OBJECT / INSTANCE that's CREATED by a CERTAIN Constructor Function WILL INHERIT / automatically GET ACCESS TO ALL the METHODS that we DEFINE on the Constructor's "prototype" Property.

// EX - ADDING a METHOD to the "Person" "prototype" Property:
console.log(Person.prototype); // {constructor: ƒ}
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype); // {calcAge: ƒ, constructor: ƒ}

///////////////////////////////////////
// 3.2. USING PROTOTYPAL INHERITANCE / DELEGATION TO GET ACCESS TO ALL the METHODS that we DEFINED on the Constructor's "prototype" Property:
jonas.calcAge(); // 46
/*
If we type INTO THE CONSOLE "jonas" => we GET the "jonas" OBJECT / INSTANCE (of THE TYPE "Person") =>
=> // Person {firstName: 'Jonas', birthYear: 1991} => 
=> that DOES NOT INCLUDE / HAS the ".calcAge()" METHOD =>
=> which is PROOF that we USED PROTOTYPAL INHERITANCE / DELEGATION to GET ACCESS TO the ".calcAge()" METHOD that we DEFINED on the "Person.prototype" Property
*/
mathilda.calcAge(); // 20
jack.calcAge(); // 62

///////////////////////////////////////
// 3.3. CONFUSING PART - BAD NAMING:
// Jonas: "Person.prototype" is NOT the PROTOTYPE OBJECT of "Person" =>
// => Radu: TRUE => the PROTOTYPE OBJECT of "Person" is the GLOBAL "Object" PROTOTYPE OBJECT :)
// => PROOF Radu:
console.log(Person.prototype instanceof Object); // true
console.log(Object.prototype.isPrototypeOf(Person)); // true
// => OR PROOF Jonas:
// console.log(jonas.__proto__); // {calcAge: ƒ, constructor: ƒ}
// console.log(jonas.__proto__ === Person.prototype); // true
// OR
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(mathilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Jonas: "Person.prototype" SHOULD BE NAMED ".prototypeOfLinkedObjects"

///////////////////////////////////////
// 3.4. LINKING the NEWLY CREATED EMPTY OBJECT "{}" TO THE PROTOTYPE OBJECT:
/*
THIS IS Step 3. of 2.4. (HOW CALLING a Constructor Function USING the "new" Operator WORKS) =>
=> CREATES the "__proto__" Property 
AND
=> SETS its VALUE to the "prototype" Property of the Constructor Function that is being CALLED by the "new" Operator
*/
console.log(jonas.__proto__); // {calcAge: ƒ, constructor: ƒ}
console.log(Person.prototype); // {calcAge: ƒ, constructor: ƒ}
console.log(jonas.__proto__ === Person.prototype); // true

// 3.4. ADDING a PROPERTY to the Constructor's "prototype" Property:
// this Way / Technique / Pattern will ADD a Property INDIRECTLY (NOT AN OWN / DIRECT Property) to the OBJECTS / INSTANCES of the "Person" PROTOTYPE OBJECT
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, mathilda.species); // 'Homo Sapiens' 'Homo Sapiens'

// PROOF:
console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}
console.log(jonas.hasOwnProperty('firstName')); // true => the "firstName" Property IS a OWN / DIRECT Property of the "jonas" OBJECT / INSTANCE
console.log(jonas.hasOwnProperty('species')); // false => the "species" Property IS NOT a OWN / DIRECT Property of the "jonas" OBJECT / INSTANCE (IT'S an INDIRECT Property)

console.log(jack); // Person {firstName: 'Jack', birthYear: 1975}
console.log(jack.hasOwnProperty('firstName')); // true
console.log(jack.hasOwnProperty('species')); // false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 4. CONCLUZII & BEST PRACTICES:
///////////////////////////////////////
// 4.1. PROPRIETATILE le adaugam PROGRAMATIC cu:
/*
1. Constructor Function + the "new" Operator => OWN / DIRECT Properties
SAU CU
2. Constructor Function "prototype" Property (".prototype.AnyPropertyName") => INDIRECT (NOT OWN / DIRECT) Properties
*/

///////////////////////////////////////
// 4.2. METODELE le adaugam PROGRAMATIC cu Constructor Function "prototype" Property (".prototype.AnyMethodName();")

///////////////////////////////////////
// 4.3. The END / TOP of the PROTOTYPE CHAIN === the GLOBAL "Object" PROTOTYPE OBJECT (which has "__proto__" Property === null)
console.log(Object.prototype.__proto__); // null
// OR
console.log(jonas.__proto__.__proto__.__proto__); // null

///////////////////////////////////////
// 4.4. the "Person" OBJECT PROTOTYPE itself has a Constructor Property THAT POINTS BACK to the "Person" Constructor Function itself.
// console.log(Person.prototype.constructor); // the "Person" Constructor Function // ƒ (firstName, birthYear) {...}
// TO BETTER INSPECT this function we use "console.dir()":
console.dir(Person.prototype.constructor); // ƒ Person(firstName, birthYear)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// Radu ~ Jonas:
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

new Car('testCar', 'testSpeed');
console.log(new Car('testCar', 'testSpeed')); // Car {make: 'testCar', speed: 'testSpeed'}

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h.`);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h.`);
};

// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
const car1 = new Car('BMW', 120);
console.log(car1); // Car {make: 'BMW', speed: 120}
const car2 = new Car('Mercedes', 95);
console.log(car2); // Car {make: 'Mercedes', speed: 95}

car1.accelerate(); // BMW is going at 130 km/h.
car1.brake(); // BMW is going at 125 km/h.
car1.accelerate(); // BMW is going at 135 km/h.

car2.brake(); // Mercedes is going at 90 km/h.
car2.accelerate(); // Mercedes is going at 100 km/h.
car2.accelerate(); // Mercedes is going at 110 km/h.
car2.brake(); // Mercedes is going at 105 km/h.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
