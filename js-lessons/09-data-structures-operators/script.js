// 'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // A Practical application of Destructuring Objects
  // we also have set Default Values for some of the variables to be displayed
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = 'DefaultValue',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}. Thank you for your order!`
    );
  },

  // A Practical application of Using the Spread Operator to PASS arguments and parameters into a Function
  orderPasta: function (ingr1, ingr2, ingr3) {
    console.log(
      `Here is your delicious pasta made with ${ingr1}, ${ingr2} and ${ingr3}! Bon appetit!`
    );
  },

  // A Practical application of Using the Rest Operator to PASS arguments and parameters into a Function
  // Enhanced Object Literals
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Destructuring Arrays
const arr = [2, 3, 4];

// 1.1.1. Destructuring Arrays Before ES6
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

// 1.1.2. Destructuring Arrays After ES6
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// 1.2. Skipping an element in the array
const [first, second] = restaurant.categories;
console.log(first, second);
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// 1.3.1 Switching / Mutating elements while Destructuring Arrays - before ES6
/*
const temp = main;
// console.log(temp);
// console.log(main);
main = secondary;
// console.log(main);
// console.log(secondary);
secondary = temp;
// console.log(secondary);
// console.log(temp);
console.log(main, secondary);
*/

// 1.3.2. Switching / Mutating elements while Destructuring Arrays - after ES6
[main, secondary] = [secondary, main];
console.log(main, secondary);

// 1.4. Receiving 2 return values from a Function Call
console.log(restaurant.order(2, 0)); // returns an array with 2 elements: 1. position 2 from "restaurant.starterMenu" = "Garlic Bread" & 2. position 0 from "restaurant.mainMenu" = "Pizza"
const [starterCourse, mainCourse] = restaurant.order(2, 0); // destructures the array above
console.log(starterCourse, mainCourse); // displays the values of the array

// 1.5. Destructuring Nested Arrays
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);

const [k, , [l, m]] = nested;
console.log(k, l, m);

// 1.6. Setting Default Values for the variables when we are Destructuring them from an aray
// const [p, q, r] = [8, 9];
// console.log(p, q, r);
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2. Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//  2.1. Renaming variables from Object Properties
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags, restaurant);

// 2.2. Setting Default Values for the variables when we are Destructuring them from an aray
const { menu = [1], starterMenu: starters = [] } = restaurant; // menu does not exist in the current "restaurant" Object so we are setting the Default value to "empty"
console.log(menu, starters);
/*
// Radu - extra
const {
  name2: restaurantName2 = ['Default1'],
  location2: restaurantLocation = [2],
  menu22 = [true],
} = restaurant; // adding more non-existing Object Properties the current "restaurant" Object & setting them to different Default values
console.log(restaurantName2, restaurantLocation, menu22);
*/

// 2.3. Switching / Mutating variables while Destructuring Objects
let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };

// !!! we MUST USE PARENTHESIS for this to work !!!
({ d, e } = obj);
console.log(d, e);

// 2.4. Destructuring Nested Objects
const { fri } = openingHours;
console.log(fri);
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
// also Renaming the Object Properties inside the "fri" Nested Object
const {
  fri: { open: O, close: C },
} = openingHours;
console.log(O, C);

// 2.5. A Practical application of Destructuring Objects
// instead of defining multiple parameters manually, we can PASS AN OBJECT into the Function as an ARGUMENT and CALL the Function
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Mare, 17',
  mainIndex: 2,
  starterIndex: 2,
});

// we also have set Default Values for some of the variables to be displayed
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. The Spread Operator
// The Spread Operator WORKS on ALL ITERABLES (Arrays, Strings, Maps, Sets etc.) but ALSO on OBJECTS (since ES2018)
// SPREAD, because "..." on RIGHT side of "="

// 3.1. Before & After the Spread Operator
// 3.1.1. Before the Spread Operator
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

// 3.1.2. After the Spread Operator
const newArr = [1, 2, ...arr2];
console.log(newArr);

// 3.2. Using the Spread Operator to UNPACK ITERABLES (Strings, Arrays, Maps, Sets etc., BUT ALSO OBJECTS, INDIRECTLY (since ES2018))
// 3.2.1. Unpacking a String
const firstName = 'Jonas';
console.log(...firstName); // displays "J o n a s" (with space between the letters)
// 3.2.2. Unpacking an Array
console.log(...newArr); // displays "1 2 7 8 9" (with space between the numbers)
// 3.2.3. Unpacking an Object
// console.log(restaurant);
// console.log(...restaurant); // we CANNOT UNPACK an Object !!AND!! Display it DIRECTLY to the console (like we did with the OTHER ITERABLES) - see 3.5.3. for more...

// 3.5. Using the Spread Operator on ARRAYS
// 3.2.3. Creating a NEW Array by Copying an old one, UNPACKED with the Spread Operator & Adding a NEW item to the "mainMenu" Property
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// const newMenu = ["Hamburgers", ...restaurant.mainMenu, "Gnocci"];
console.log(restaurant.mainMenu);
console.log(newMenu);
console.log(...restaurant.mainMenu); // Unpacking the Array
console.log(...newMenu); // Unpacking the Array

// 3.3. Using the Spread Operator to COPY ARRAYS - also SHALLOW Copy
const mainMenuCopy = [...restaurant.mainMenu]; // similar to the "Object.assign" Method
console.log(mainMenuCopy);
console.log(restaurant.mainMenu);
console.log(...mainMenuCopy); // Unpacking the Array
console.log(...restaurant.mainMenu); // Unpacking the Array

// 3.4. Using the Spread Operator to MERGE (join) 2(or more) ARRAYS together
const menuUpdated = [...restaurant.starterMenu, ...restaurant.mainMenu]; // MUST HAVE "..." aka the Spread Operator on ALL of the Arrays we want to MERGE
console.log(menuUpdated);
console.log(...menuUpdated); // Unpacking the Array
/*
// Extra - Radu - MUST HAVE "..." aka the Spread Operator on ALL of the Arrays we want to MERGE
const menuUpdated2 = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
  ...["Sauces", "Desserts", "Side Dishes", "Beverages"],
];
console.log(menuUpdated2);
console.log(...menuUpdated2);
*/

// 3.4. Using the Spread Operator to PASS Arguments into a Function
const ingredients = [
  // prompt("Let's make pasta! Insert ingredient 1:"),
  // prompt('Insert ingredient 2:'),
  // prompt('Insert ingredient 3:'),
];
console.log(ingredients);

// WITHOUT using the Spread Operator
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// using the Spread Operator
restaurant.orderPasta(...ingredients);

// 3.5. Using the Spread Operator on OBJECTS
// 3.5.0. Extra - Radu: ADDING A PROPERTY TO AN OBJECT
/*
// from the "Primitives vs. Objects ... Copying objects" lectures - SHALLOW Copy
const mee = {
  name: "Jonas",
  age: 30,
};
const friend = mee;
friend.age = 27; // ALL REFERENCE TYPES VALUES DECLARED WITH CONST IN OBJECTS ARE !!MUTABLE!!, unlike IN PRIMITIVES TYPES, WHERE ALL VALUES DECLARED WITH CONST ARE !!IMMUTABLE!! (const in PRIMITIVE TYPES = IMMUTABLE vs const in REFERENCE TYPES = MUTABLE)
console.log("Friend:", friend);
console.log("Me", mee);
*/

/*
const restaurantNewMenu = restaurant;
restaurant.newMenu = newMenu; // ADDING A PROPERTY TO AN OBJECT will modify BOTH Objects
console.log(restaurantNewMenu); // Same as the "restaurant" Object - see "Primitives vs. Objects" lectures ... Copying objects - SHALLOW Copy
console.log(restaurant); // // Same as the "restaurantNewMenu" Object - see "Primitives vs. Objects" lectures ... Copying objects - SHALLOW Copy
*/

// 3.5.1. Using the Spread Operator to COPY OBJECTS - SHALLOW Copy - similar to the "Object.assign" Method
const restaurantCopy = { ...restaurant };
console.log('restaurant Object Copy:', restaurantCopy);
console.log('initial restaurant Object:', restaurant);

// PROOF that this Method of copying Objects is also SHALLOW (just like the "Object.assign" Method) & also modifies the original "restaurant" Object. This only modifies the Object on a surface level, not on a DEEP level. We need a more complex Method to copy Objects that we will learn later on...
restaurantCopy.starterMenu.push('Salads');
console.log(restaurantCopy.starterMenu);
console.log(restaurant.starterMenu);

// 3.5.2. Creating a NEW Object by Copying an old one, UNPACKED with the Spread Operator & Adding new Properties to it - also SHALLOW Copy (just like the "Object.assign" Method)
const newRestaurant = { foundedIn: 1919, ...restaurant, founder: 'Giuseppe' }; // the order in which we add the new Properties is NOT important
console.log(newRestaurant);
console.log(restaurant);

// 3.5.3. Unpacking an Object
// console.log(restaurant);
// console.log(...restaurant); // we CANNOT UNPACK an Object !!AND!! Display it DIRECTLY to the console (like we did with the OTHER ITERABLES)
// BUT we can Display the Properties (PACKED or UNPACKED) of the Object DIRECTLY to the console
console.log(
  restaurant.name,
  restaurant.location,
  restaurant.mainMenu,
  ...restaurant.starterMenu
);

// ALSO we can MODIFY the Properties of the NEW Object's Copy, UNPACK them & Display them DIRECTLY to the console
// const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
restaurantCopy.founder = 'Romeo';
restaurantCopy.foundedIn = 2022;
console.log(
  restaurantCopy.name, // modified
  restaurantCopy.founder, // modified
  restaurantCopy.foundedIn, // modified
  ...restaurantCopy.mainMenu // same as "restaurant"
);
// Vs
console.log(
  restaurant.name,
  restaurant.founder, // does not exists in the initial "restaurant" Object
  restaurant.foundedIn, // does not exists in the initial "restaurant" Object
  ...restaurant.mainMenu
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4. Rest Pattern / Operator and Parameters
// 4.1. Using Destructuring !!AND!! the Rest Operator

// SPREAD, because "..." on RIGHT side of "="
// const arr = [1, 2, ...[3, 4]];

// REST, because "..." on LEFT side of "="
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// 4.1.1. Using Destructuring !!AND!! the Rest Operator !!AND!! the Spread Operator in Arrays
// in an Array, VARIABLES can have ANY name
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// // 4.1.2. Using Destructuring !!AND!! the Rest Operator in Objects
// in an Object, the DESTRUCTERED Property from the Object MUST HAVE the SAME name as INSIDE that Object, WHILE the RESTED Object can have ANY name
const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);
console.log(weekdays);

// 4.2. Using the Rest Operator in Functions - REST PARAMETERS
const add = function (...numbers) {
  // "numbers" is an Array created with the REST Operator
  console.log(numbers); // displays an ARRAY [2, 3] / [5, 3, 7, 2] / [8, 2, 5, 3, 2, 1, 4]

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  console.log(sum); // displays the sum
};

add(2, 3); // displays the sum = 2 + 3
add(5, 3, 7, 2); // displays the sum = 17
add(8, 2, 5, 3, 2, 1, 4); // displays the sum = 25

const xx = [23, 5, 7];
// const xx = [23, 5, 7, 222, 333];
add(...xx); // displays the sum = 35
// 1) the SPREAD Operator is used here to UNPACK the "xx" Array and PASS it's VALUES as ARGUMENTS in the "add" Function Call
// 2) the "add" Function receives the values as PARAMETERS
// the REST Operator PACKS the received values (aka REST PARAMETERS) into an Array (aka "numbers") so that the "for" loop can iterate through that Array and display the SUM of the values to the console

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); // displays "mushrooms" as "mainIngredient" & ["onion", "olives", "spinach"] as the "otherIngredients" Array
restaurant.orderPizza('mushrooms'); // displays "mushrooms" as "mainIngredient" & [] as the "otherIngredients" Array (empty array)

/*
// 4.3. Conclusions:
* The DIFFERENCES between the REST Operator & the SPREAD Operator:
1) REST is the OPPOSITE of SPREAD
2) REST is on the LEFT of the "=" while SPREAD is on the RIGHT of the "="
3) REST PACKS (ONLY into an ARRAY / OBJECT ) while SPREAD UNPACKS (from ALL ITERABLES and OBJECTS (!!!AND ONLY WORKS INDIRECTLY to display an UNPACKED Object to the console))
4) REST = VARIABLES + "," while SPREAD = VALUES + ","

* !!! WE CANNOT USE the REST Operator OR the SPREAD Operator inside Template Literals :( !!!

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. Short Circuiting (&& and ||)
// when we are converting a value to a BOOLEAN value, we will get either a TRUTHY value OR a FALSY value:
// strings
console.log(Boolean('Jonas')); // TRUTHY value
console.log(Boolean('')); // FALSY value

// numbers
console.log(Boolean(11)); // TRUTHY value
console.log(Boolean(0)); // FALSY value

// objects
console.log(Boolean(restaurant)); // TRUTHY value
console.log(Boolean({})); // !!ALSO a TRUTHY value!!
console.log(Boolean([])); // !!ALSO a TRUTHY value!!

// The OR Operator || and the AND Operator && can use ANY data type, return ANY data type, short-circuiting
console.log('Short Circuiting: The OR Operator || and the AND Operator &&');

// 5.1. The OR Operator ||
// => looking for TRUTHY values (number, string, boolean, symbol, bigInt, Object, {}(empty Object), Array, [](empty Array))
// => returns the first Truthy value OR the last Falsy value
console.log('1. ---- OR ----');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); // returns "null" because it's the last Falsy value - there's no short-circuiting happening here

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // returns "Hello" because it's the first Truthy value

// Practical example
restaurant.numGuests = 23;
// restaurant.numGuests = 0; // this does NOT work with the OR Operator => we need to use the NULLISH Coalescing Operator (??) - SEE 6.
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
// console.log(restaurant);

const guests2 = restaurant.numGuests || 10;
// const guests2 = restaurant.numGuests ?? 10; // using the NULLISH Coalescing Operator (??) - SEE 6.
console.log(guests2);
console.log(restaurant);

// 5.2. The AND Operator &&
// => is the OPPOSITE of ||
// => looking for FALSY values (0, "", undefined, null, NaN)
// => returns the first Falsy value OR the last Truthy value
console.log('2. ---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas'); // returns "Jonas" because it's the last Truthy value - there's no short-circuiting happening here

console.log('Hello' && 23 && null && 'jonas'); // returns "null" because it's the first Falsy value

// Practical example
// WITHOUT the AND Operator &&
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// using the AND Operator && to avoid creating an "if" statement only to check if a certain Object Property, Method or Value actually exists
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
// if that Object Property, Method or Value does NOT exists => NOTHING HAPPENS (the function is not executed in this case)
restaurant.orderPizzazzz && restaurant.orderPizzazzz('mushrooms', 'spinach');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. The Nullish Coalescing Operator ??
// ?? => looking for NON-NULLISH values
// NULLISH values = ONLY "null" and "undefined"
// => returns the first NON-nullish value OR the last nullish value

console.log(0 ?? true ?? null); // returns "0" - the first NON-nullish value
console.log(null ?? true ?? 0); // returns "true" - the first NON-nullish value
console.log(undefined ?? null); // returns "null" - the last nullish value

restaurant.numGuestsCorrect = 0;
const guests = restaurant.numGuestsCorrect || 10;
console.log(guests); // returns "10" because "10" is the Truthy value, which is WRONG because we set the initial "restaurant.numGuestsCorrect" Property of the "restaurant" object to "0"
// console.log(restaurant); // PROOF that "restaurant.numGuestsCorrect = 0;

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuestsCorrect ?? 10; // returns "0" because "0" is the first NON-nullish value, which is CORRECT because we set the initial "restaurant.numGuestsCorrect" Property of the "restaurant" object to "0"
console.log(guestCorrect);
// console.log(restaurant); // PROOF that "restaurant.numGuestsCorrect" = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 7. Logical Assignment Operators
// (just like "+=" or "-=" etc.)
// ||=
// ??=
// &&=

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// WITHOUT the Logical OR Assignment Operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1);
// console.log(rest2);

// using the Logical OR Assignment Operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1); // 10
// console.log(rest2); // 10

// using the Logical Nullish Assignment Operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;
// console.log(rest1); // 0
// console.log(rest2); // 10

// using the Logical AND Assignment Operator
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
rest1.owner;
console.log(rest1); // NOTHING changes because "rest1.owner" does NOT exists ("rest1.owner" = falsy value) <=> the Object stays the same
console.log(rest2); // returns the last Truthy value ("ANONYMOUS")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 8. Looping Arrays: The for-of Loop
// We can USE "continue" AND "break" in the "for-of" Loop
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) {
  console.log(item);
}
// FOR each "item" OF the "menu2" Array "console.log(item)"

// to get the INDEX of the Array we must USE the "array.entries()" METHOD which will return multiple smaller Arrays, each of them made of the Index of the Array Element and the Element itself
console.log(menu2);
for (const item of menu2.entries()) {
  console.log(item);
}

// destructuring the smaller Arrays into "i" = index and "el" = element
// console.log([...menu2.entries()]);
for (const [i, el] of menu2.entries()) {
  console.log(`${i + 1}: ${el}`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 9. Enhanced Object Literals
// 9.1. To ADD (insert / nest) an Object into another Object as an Object Property we can USE Enhanced Object Literals by simple writing that Object's name as a Property
const pls = {
  mIRC: 'mIRC reference',
};
const aslPls = {
  age: 'randomAge',
  sex: 'randomSex',
  location: 'randomLocation',
  // Old way - before ES6
  // pls: pls,
  // Enhanced Object Literals - after ES6
  pls,
};

console.log(aslPls);

// 9.2. NEW SYNTAX to write Object Methods
const restaurantNewSyntax = {
  orderPizza(mainIngredient, other) {
    console.log(mainIngredient);
    console.log(other);
  },
};

restaurantNewSyntax.orderPizza('NEW', 'SYNTAX');

// instead of Old Syntax
const restaurantOldSyntax = {
  orderPizza: function (mainIngredient, other) {
    console.log(mainIngredient);
    console.log(other);
  },
};
restaurantOldSyntax.orderPizza('Old', 'Syntax');

// 9.3. Computing Object Property names
const weekdays2 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const weAreOpenOn = {
  [weekdays2[0]]: {
    open: 10,
    close: 22,
  },
  [weekdays2[1]]: {
    open: 10,
    close: 22,
  },
  [weekdays2[2]]: {
    open: 10,
    close: 22,
  },
  [`day ${2 + 2} of the week`]: {
    open: 8,
    close: 24,
  },
  [`rest of the week`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(weAreOpenOn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 10. Optional Chaining Operator (?.)
// WORKS on: Object Properties, Object Methods AND on Arrays
// BEST USED to check if Object Properties actually EXISTS ("EXISTS" = NOT "null" OR "undefined")

// WITHOUT Optional Chaining Operator (?.)
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// "restaurant.openingHours.mon" does NOT exists so NOTHING is displayed
// console.log(restaurant.openingHours.mon.open);

// WITH Optional Chaining Operator (?.)
console.log(restaurant.openingHours.mon?.open);
// "restaurant.openingHours.mon" does NOT exists so "undefined" is displayed
// we can USE MULTIPLE Optional Chaining Operators tied together
console.log(restaurant.openingHours?.mon?.open); // undefined

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// using "Dot vs. Bracket Notation" - see lecture from JS Fundamentals Part 2
// using the Optional Chaining Operator (?.)
// using the Nullish Operator inside a variable
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
// WITH Optional Chaining Operator (?.)
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

// WITH Optional Chaining Operator (?.)
console.log(users[0]?.name ?? 'User array empty');

// WITHOUT Optional Chaining Operator (?.)
// if (users.length > 0) console.log(users[0].name);
// else console.log("user array empty");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 11. Looping Objects: Object Keys, Values, and Entries
// 11.1. Looping over Object Property NAMES
// Object Properties NAMES = KEYS = Object.keys
// !! almost always, Object KEYS = STRINGS !!
// Object.keys(ObjectsName.anyPropertyNameFromANestedObject) returns an ARRAY with all the Properties NAMES of that Nested Object
// then this Array can be Looped

// *** RADU ***
console.log(openingHours); // we DESTRUCTURED the "openingHours" Property from the "restaurant" Object - see lines 172 + 173 + 174 BELOW
// line 172: 2. Destructuring Objects
// line 173: const { name, openingHours, categories } = restaurant;
// line 174: console.log(name, openingHours, categories);
// *** IT'S BEST TO USE the "ObjectsName.anyPropertyNameFromANestedObject" from now onward TO AVOID CONFUSION, unlike Jonas examples where he uses the DESTRUCTURED "openingHours" Property from the "restaurant" Object ***
console.log(restaurant.openingHours);

// we use the "Object.keys()" Method to Loop over Object Property NAMES
const properties = Object.keys(restaurant.openingHours); // returns an Array
console.log(properties);

// using the for-of loop & string concatenation of Template Literals together with the "+=" logical operator to loop over Object Property NAMES
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  // console.log(day);
  openStr += `${day}, `;
}
console.log(openStr);

// 11.2. Looping over Object Property VALUES
// Object Properties VALUES = Object.values
// Object.values(ObjectsName.anyPropertyNameFromANestedObject) returns an ARRAY with all the Properties VALUES of that Nested Object
// then this Array can be Looped

// we use the "Object.values()" Method to Loop over Object Property VALUES
const values = Object.values(restaurant.openingHours); // returns an Array
console.log(values);

for (const value of values) {
  console.log(value);
  // console.log(`We open at ${open} and we close at ${close}.`); // !!! NOT WORKING: "script.js:674 Uncaught TypeError: .for is not iterable at script.js:674:35"
}

// 11.3. Looping over Entire Object
// Object Properties ENTRIES = Object.entries = KEYS + VALUES => ENTRIES = NAMES + VALUES
// Object.entries(ObjectsName.anyPropertyNameFromANestedObject) returns an ARRAY with NESTED ARRAYS inside
// EACH ONE of those NESTED ARRAYS contains the Property NAME (the KEY) AND the Property VALUE FOR EACH PROPERTY of that Nested Object
// then this ARRAY (with the NESTED ARRAYS inside) can be DESTRUCTERED (BOTH arrays AND objects can be destructured - see 1. & 2. of the "09-data-structures-operators" lecture notes) and Looped

// we use the "Object.entries()" Method to Loop over THE ENTIRE Object
const entries = Object.entries(restaurant.openingHours); // returns an Array
console.log(entries);
// *** FOR OBJECTS we use the "Object.entries()" Method
// *** FOR ARRAYS we use the "anyArrayNameWeWantToLoopOver.entries()" Method - see 8. "Looping Arrays: The for-of Loop" lecture with the "menu2.entries" example

// using the for-of Loop
// using Destructuring of an Array into [key, value]
// using Destructuring of an Object (value = the "openingHours" Object (nested inside the "restaurant" Object)) into { open, close }

// for better understanding... Radu
// for (const [key, value] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }
// key = day = object property NAME
// value = object property VALUE (set of values in this case: "open" & "close")
console.log(restaurant.openingHours);
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 12. Sets
// a SET is a collection of UNIQUE Values => a SET can NEVER have duplicates
// a Set DOES NOT have any Indexes => there's NO WAY to retrieve values from a Set
// we CAN USE the For-of LOOP on SETS
// we CAN USE the SPREAD Operator on SETS

// 12.1. Creating a new SET
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

// 12.2. Checking the size / length of a SET
console.log(ordersSet.size); // 3
console.log(new Set('Jonas').size); // 5

// 12.3. Checking for values in a SET
console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false

// 12.4. Adding values to a SET
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);
console.log(ordersSet.size); // 4

// 12.5. Deleting values from a SET
ordersSet.delete('Risotto');
console.log(ordersSet);
// Deleting ALL values from a SET
// ordersSet.clear();
// console.log(ordersSet);

// 12.6. Looping over Sets
// we CAN USE the For-of LOOP on SETS
for (const order of ordersSet) {
  console.log(order);
}
console.log(...ordersSet);

// Examples
// 12.7. Converting a SET into an Array
// we can CONVERT a SET into an Array just by placing the Set inside [] AND we CAN USE the SPREAD Operator on that SET
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
// OR Radu
console.log(new Set(staff).size);
// console.log(staffUnique.size); // DOES NOT WORK because the "staffUnique" SET has been CONVERTED INTO an Array
// SO WE NEED TO USE ".length" instead:
console.log(staffUnique.length); // 3

console.log(new Set('jonasschmedtmann').size); // 11
console.log(new Set('jonas schmedt mann').size); // 12 - the empty space between words is also counted as a UNIQUE Value (but only once, of course)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 13. Maps
// *** 13.1. Maps: Fundamentals
// a MAP is a Data Structure we can use to ASSIGN / BIND VALUES to KEYS
// !! unlike in Objects, in MAPS the KEYS can have ANY TYPE (strings, numbers, objects, arrays, other maps etc.) !!

// 13.1.1. Creating a new MAP
// EASIEST WAY to CREATE a MAP = CREATE AN EMPTY MAP
const rest = new Map();
console.log(rest);

// 13.1.2. Adding values to a MAP
// then use the ".set()" Method to ADD elements to the Map
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');

// CALLING the ".set()" Method in MAPS returns the UPDATED Map
console.log(rest.set(2, 'Lisbon, Portugal'));

// so, the ".set()" Method in MAPS can be CHAIN LINKED multiple times (mapName.set(..).set(..).set(..))
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest);

// 13.1.3. Getting data from a MAP
// TO READ / GET data from a MAP we use the ".get()" Method and PASSING the KEY inside ()
console.log(rest.get('name')); // Classico Italiano
console.log(rest.get(true)); // We are open :D
console.log(rest.get(1)); // Firenze, Italy

// const time = 21;
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // console.log(rest.get(true && false)); => console.log(false); => We are closed :(

// 13.1.4. Checking for values in a MAP
console.log(rest.has('categories'));

// 13.1.5. Deleting values from a MAP
rest.delete(2);
console.log(rest);
// Deleting ALL values from a MAP
// rest.clear();
// console.log(rest);

// 13.1.6. Checking the size / length of a MAP
console.log(rest.size);

// 13.1.7. HEAP misplacement - using Objects / Arrays as MAP KEYS
rest.set([1, 2], 'Test1');
console.log(rest);
console.log(rest.get([1, 2])); // NOT WORKING - because it DOES NOT refer to the same place in the HEAP - we need to set the Array to a variable
const arr3 = [1, 2];
rest.set(arr3, 'Test2');
console.log(rest);
console.log(rest.get(arr3)); // WORKING - because it refers to the same place in the HEAP

// 13.1.8. Using DOM elements as MAP KEYS
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// *** 13.2. Maps: Iteration
const question = new Map([
  // !! MUST HAVE [] INSIDE new Map()
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// 13.2.1. Converting an OBJECT into a MAP
// Radu:
const testObject = {
  property1: 0,
  property2: true,
  property3: 'test',
  property4: [1, 2, 3],
};
console.log(testObject);
// Step 1 : we Convert / Destructure the OBJECT into an ARRAY using the "Object.entries();" Method
// Step 2 : we Convert the ARRAY into an MAP using "new Map()"
const objectToMap = new Map(Object.entries(testObject));
console.log(objectToMap); // Map(4) {'property1' => 0, 'property2' => true, 'property3' => 'test', 'property4' => Array(3)}

// Jonas:
// (!!! this RETURNS AN ARRAY, NOT AN OBJECT => Converting an ARRAY into a MAP: !!!) - Radu
// we can CONVERT an ARRAY into a MAP using "new Map(Object.entries("...");)" Method
console.log(Object.entries(restaurant.openingHours));
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap); // Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}
// NOW we CAN USE the For-of LOOP on MAPS

// 13.2.2. LOOPing over MAPs
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt("Your answer is:"));
const answer = 3; // setting a default answer to stop prompting
console.log(answer);
console.log(question.get(question.get('correct') === answer));
// OR Radu
console.log(question.get(answer === 3));

// 13.2.3. Converting an ARRAY into a MAP
// Radu - my solution
const questionRadu = [
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
];
console.log(questionRadu);
const questionRaduMap = new Map([...questionRadu]); // using the SPREAD Operator to UNPACK "questionRadu" Array into a NEW Array of Nested Arrays
console.log(questionRaduMap);
// test
console.log(questionRaduMap.get(3)); // Displays "JavaScript"

// 13.2.4. Converting a MAP into an ARRAY AND Using Methods on MAPS
console.log(question);
// we are first building an Array using the [] ...
console.log([...question]);
// ... AND then unpacking the "question" MAP using the SPREAD Operator into that Array WHILE also applying different METHODS to that MAP
// AND Using Methods on MAPS
console.log([...question.entries()]); // THE SAME as "console.log([...question]);"
console.log([...question.keys()]);
console.log([...question.values()]);

// *****Radu - Extra
// 13.2.3. Converting an MAP into an OBJECT
const newMapTest = new Map()
  .set(1, 'aa')
  .set(2, 'bb')
  .set(true, 1)
  .set('array', [3, 4, 5]);
console.log(newMapTest); // Map(4) {1 => 'aa', 2 => 'bb', true => 1, 'array' => Array(3)} // [[Entries]] 0: {1 => "aa"} 1: {2 => "bb"} 2: {true => 1} 3: {"array" => Array(3)}
console.log(newMapTest.get(true)); // 1

const mapToObject = Object.fromEntries(newMapTest);
console.log(mapToObject); // {1: 'aa', 2: 'bb', true: 1, array: Array(3)}
// console.log(mapToObject.get(1)); // PROOF that this is an OBJECT "Uncaught TypeError: mapToObject.get is not a function"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ***** Radu - Extra
// ***** Converting an ARRAY into an OBJECT
const arrTest = [
  ['property1', 0],
  ['property2', true],
  ['property3', 'test'],
  ['property4', ['nested', 'array']],
];
const arrToObject = Object.fromEntries(arrTest);
console.log(arrToObject, typeof arrToObject); // {property1: 0, property2: true, property3: 'test', property4: Array(2)} // 'object'

// ***** Converting / Destructuring an OBJECT into an ARRAY
console.log(Object.entries(arrToObject)); // (4) [Array(2), Array(2), Array(2), Array(2)]
// 0 : (2) ['property1', 0]
// 1 : (2) ['property2', true]
// 2 : (2) ['property3', 'test']
// 3 : (2) ['property4', Array(2)]
// length : 4
// [[Prototype]] : Array(0)

for (const [key, value] of Object.entries(arrToObject)) {
  console.log(`key: ${key} + value: ${value}`);
}
// key: property1 + value: 0
// key: property2 + value: true
// key: property3 + value: test
// key: property4 + value: nested,array

// !!! we MUST USE DESTRUCTURING + we MUST CALL the ".entries();" Method on the ARRAY we got from "Object.entries(arrToObject)"
for (const [i, [key, value]] of Object.entries(arrToObject).entries()) {
  console.log(`index: ${i} + key: ${key} + value: ${value}`);
}
// index: 0 + key: property1 + value: 0
// index: 1 + key: property2 + value: true
// index: 2 + key: property3 + value: test
// index: 3 + key: property4 + value: nested,array

const arrFromObjectKeys = Object.keys(arrToObject);
console.log(arrFromObjectKeys); // (4) ['property1', 'property2', 'property3', 'property4']
// !!! we MUST USE DESTRUCTURING + we MUST CALL the ".entries();" Method on the ARRAY we got from "Object.keys(arrToObject)"
for (const [i, el] of arrFromObjectKeys.entries()) {
  console.log(`index: ${i} + element: ${el}`);
}
/*
index: 0 + element: property1
index: 1 + element: property2
index: 2 + element: property3
index: 3 + element: property4
*/

const arrFromObjectValues = Object.values(arrToObject);
console.log(arrFromObjectValues); // (4) [0, true, 'test', Array(2)]
// !!! we MUST USE DESTRUCTURING + we MUST CALL the ".entries();" Method on the ARRAY we got from "Object.values(arrToObject)"
for (const [i, value] of arrFromObjectValues.entries()) {
  console.log(`index: ${i} + value: ${value}`);
}
/*
index: 0 + value: 0
index: 1 + value: true
index: 2 + value: test
index: 3 + value: nested,array
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 14. WORKING WITH STRINGS
///////////////
// 14.1. Indexes and Length of Strings
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // 6 - the space counts as character - count starting from position 0 just like in Arrays
console.log(airline.lastIndexOf('r')); // 10 - the space counts as character - count starting from position 0 just like in Arrays
console.log(airline.indexOf('portugal')); // -1 - "portugal" does NOT exist - CASE SENSITIVE
console.log(airline.indexOf('Portugal')); // 8 - "Portugal" is on position 8 - count starting from position 0 just like in Arrays

///////////////
// 14.2. Slicing Strings
console.log(airline.slice(4)); // 'Air Portugal'
console.log(airline);
console.log(airline.slice(4, 7)); // 'Air'
console.log(airline);

console.log(airline.slice(0, airline.indexOf(' '))); // 'TAP'
console.log(airline.slice(airline.indexOf(' ') + 1, airline.lastIndexOf(' '))); // 'Air'
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'

console.log(airline.slice(-2)); // 'al'
console.log(airline.slice(1, -1)); // 'AP Air Portuga'

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat 😬');
  } else {
    console.log('You got lucky 😎');
  }
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Extra explanations on Strings:
// STRINGS are just PRIMITIVES.
// So why do they have methods?
// Whenever we call a method on a string, JavaScript will automatically, behind the scenes, CONVERT that String Primitive to a String OBJECT with the same content.
// And then it's on that OBJECT where the Methods are CALLED.
// This process is called BOXING because it basically takes our String and puts it into a BOX which is the OBJECT.
// When the operation is done the Object is converted back to a regular String Primitive.
console.log(new String('jonas')); // String {'jonas'} // [[Prototype]] : String // [[PrimitiveValue]] : "jonas"
console.log(typeof new String('jonas')); // 'object'
console.log(typeof new String('jonas').slice(1)); // 'string'

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

///////////////
// 14.3. Fixing capitalization in Strings
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // Jonas

// !! MUST DO CHALLENGE - Turn into a function - DONE !!
// V1 - Converting to Lower Case
const nameToLowerCase = function (name) {
  const str = name.toLowerCase();
  console.log(str);
  return str;
};
nameToLowerCase('ASdfgGfdgAaaAa ASAF dfa');
// V2 - Converting to Upper Case
const nameToUpperCase = function (name) {
  const str = name.toUpperCase();
  console.log(str);
  return str;
};
nameToUpperCase('ASdfgGfdgAaaAa ASAF dfa');

///////////////
// 14.4. Trimming Strings
// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n'; // "\n " = ""Enter" aka "new line"

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail); // true
// !! MUST DO CHALLENGE - Turn into a function - DONE !!
const normalizeString = function (anyString) {
  const str = anyString.toLowerCase().trim();
  console.log(str);
  return str;
};
normalizeString('   ASdfgGfdgAaaAa@ASAF.dev \n '); // "\n " = ""Enter" aka "new line" // 'asdfggfdgaaaaa@asaf.dev'
normalizeString(
  '   STRING has BEEN NormaLiZed by being converted TO LOwer CaSe and TRIMMEd  \n '
); // 'string has been normalized by being converted to lower case and trimmed'

///////////////
// 14.5. Replacing Strings
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);
// !! MUST DO CHALLENGE - Turn into a function - DONE !!
const currencyReplacement = function (currencyA, currencyB) {
  const priceA = `100${currencyA}`;
  const priceB = priceA.replace(currencyA, currencyB);
  console.log(priceA, priceB);
  return priceA, priceB;
};
currencyReplacement('$', 'RON'); // '100$' '100RON'

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // ONLY replaces the FIRST occurence of "door" with gate"
// console.log(announcement.replace(/gate/g, "door")); // older Method using Regular Expression - used before ".replaceAll();" - also Case Sensitive
console.log(announcement.replaceAll('door', 'gate')); // the ".replaceAll();" Method is NOW WORKING // 'All passengers come to boarding gate 23. Boarding gate 23!'

///////////////
// 14.6. Booleans - Checking Strings
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320')); // true
console.log(plane2.includes('Boeing')); // false
console.log(plane2.startsWith('Airb')); // true
console.log(plane2.endsWith('neo')); // true

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife'); // 'You are NOT allowed on board'
checkBaggage('Socks and camera'); // 'Welcome aboard!'
checkBaggage('Got some snacks and a gun for protection'); // 'You are NOT allowed on board'

///////////////
// 14.7. Splitting and Joining Strings
// SPLIT returns an ARRAY from a STRING
// we can LOOP over that Array
console.log('a+very+nice+string'.split('+')); // (4) ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); // (2) ['Jonas', 'Schmedtmann']
console.log('Radu-test'.split('')); // Splitting a String letter by letter - WITHOUT a space between letters // (9) ['R', 'a', 'd', 'u', '-', 't', 'e', 's', 't']

const [firstName2, lastName2] = 'Jonas Schmedtmann'.split(' ');

// JOIN returns a STRING from an ARRAY
const newName = ['Mr.', firstName2, lastName2.toUpperCase()].join(' ');
console.log(newName);
const newNameRadu = ['Mr.', firstName2, lastName2.toUpperCase()];
console.log(newNameRadu.join('/'));
const newName2 = ['Mr.', firstName2, lastName2.toUpperCase()].join('-');
console.log(newName2);
const newName3 = ['Mr.', firstName2, lastName2.toUpperCase()].join('*');
console.log(newName3);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // OR
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    // console.log(namesUpper);
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis'); // Jessica Ann Smith Davis
capitalizeName('jonas schmedtmann'); // Jonas Schmedtmann

// Extra - Radu
const anyArray = [
  'a',
  'b',
  'c',
  ' ',
  3,
  4,
  5,
  ' ',
  true,
  '_no_space_',
  [1, 2],
  ' ',
  // { key: "value" }, - NOT WORKING on Objects
];
const arrayToString = anyArray.join('');
console.log(arrayToString);

// RADU - test Accesa V1
/*
function hideDigits(num) {
  var maskedString = "";
  // Write code that returns markedString as the answer
  maskedString = [];
  for (let i = 0; i < num.length; i++) {
    if (i < num.length - 3) {
      maskedString.push("#");
    } else {
      maskedString.push(num[i]);
    }
  }
  maskedString = maskedString.join("");
  console.log(maskedString);

  return maskedString;
}

hideDigits("1234567890");
// hideDigits("a1s2d3");
*/

///////////////
// 14.8. Padding Strings
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+')); // PADDING from the Start of the String to the End - Left to Right
console.log(message.padEnd(20, '+')); // PADDING from the End of the String to the Start - Right to Left
console.log(message.padStart(20, '+').padEnd(26, '+')); // PADDING can the CHAIN LINKED - PADDING from the Start of the String to the End AND from the End of the String to the Start
console.log(message.padStart(20, '+-').padEnd(26, '*/')); // MULTIPLE characters or set of characters can be added

// Practical example - !!! HIDING LAST DIGITS OF A CREDIT CARD !!!
const maskCreditCard = function (number) {
  // const str = String(number); // converting a Number to a String
  // or
  const str = number + ''; // converting a Number to a String
  const last = str.slice(-4);
  console.log(last, str.length);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836)); // ****7836
console.log(maskCreditCard(43378463864647384)); // *************7384
console.log(maskCreditCard('33485949 3847 7557747 47')); // ********************7 47

// RADU - test Accesa V2
// /*
function hideDigits(num) {
  var maskedString = '';
  // Write code that returns markedString as the answer
  maskedString += num;
  // console.log(maskedString);
  // console.log(typeof maskedString);
  maskedStringSlice = maskedString.slice(-3);
  // console.log(maskedString);
  maskedString = maskedStringSlice.padStart(maskedString.length, '#');

  console.log(maskedString);
  return maskedString;
}

hideDigits('123 456 890'); // '########890'
hideDigits(1234567890123); // '##########123'
hideDigits('a1s2d3'); // '###2d3'
// */

///////////////
// 14.9. Repeating Strings
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(2)); // 'Bad weather... All Departures Delayed... Bad weather... All Departures Delayed... '

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(5); // 'There are 5 planes in line ✈✈✈✈✈'
planesInLine(3); // There are 3 planes in line ✈✈✈
planesInLine(12); // There are 12 planes in line ✈✈✈✈✈✈✈✈✈✈✈✈

///////////////
// 14.10. The NEW ".at();" Method
// INDICATES THE POSITION / INDEX OF AN ELEMENT IN THE STRING
// ALSO WORKS ON ARRAYS
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
console.log(['jonas', 2, [1, 2], undefined, true].at(-1));

///////////////
// 14.11. CHECK OUT MORE STRING METHODS @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

// Extra - Radu
// !!! How to REVERSE a String !!!
const str = 'hello';
// console.log(str.reverse()); // NOT WORKING ON STRINGS - "str.reverse is not a function" - Method ONLY works on ARRAYS
const array = [1, 2, 3, true, 'false'];
console.log(array.reverse());

// Solutions:
// V1 - Detailed version
function reverseStringV1(str) {
  // Step 1. Use the ".split();" Method to return a new array
  const splitString = str.split(''); // const splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the ."reverse();" Method to reverse the new created array
  const reverseArray = splitString.reverse(); // const reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the ".join();" Method to join all elements of the array into a string
  const joinArray = reverseArray.join(''); // const joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  console.log(joinArray); // "olleh"
  return joinArray; // "olleh"
}
reverseStringV1('hello V1');

// V2 - Faster version
function reverseStringV2(str) {
  const reverseString = str.split('').reverse().join(''); // the ".reverse();" Method ONLY works on ARRAYS (".split("");" returns an Array on which the ".reverse();" Method is applied)
  console.log(reverseString);
  return reverseString;
}
reverseStringV2('hello V2'); // '2V olleh'
reverseStringV2('Hello! How are you?'); // '?uoy era woH !olleH'

///////////////////////////////////////
// Coding Challenge #4 - Converting underscore string to camel case string
// SIMPLE Version <=> SEE Challenge #13 for Detailed and more Complex Version
const underscoreToCamelCase = function (str) {
  const [first, second] = str.toLowerCase().trim().split('_');
  const output = `${first}${second.replace(
    second[0],
    second[0].toUpperCase()
  )}`;
  console.log(`${output} ✅`);
  // console.log(`${output.padEnd(20)}${"✅".repeat(2)}`); // OR "... .padEnd(20, " "). ..."
  return output;
};
underscoreToCamelCase('underscore_camel'); // 'underscoreCamel ✅'
underscoreToCamelCase('first_name'); // 'firstName ✅'
underscoreToCamelCase(' Some_Variable'); // 'someVariable ✅'
underscoreToCamelCase('  calculate_AGE '); // 'calculateAge ✅'
underscoreToCamelCase('   delaYed_dEparturE    '); // 'delayedDeparture ✅'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String Methods Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');

  // Jonas
  // const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
  //   "_",
  //   " "
  // )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
  //   ":",
  //   "h"
  // )})`.padStart(36); // padding set to default "" empty space for aligning to the right side - NOT really working and depends on  viewport size
  // Radu
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`; // no padding for better viewing - aligned to left

  console.log(output);
}
// 🔴 Delayed Departure from FAO to TXL (11h25)
//  Arrival from BRU to FAO (11h45)

// 🔴 Delayed Arrival from HEL to FAO (12h05)
//  Departure from FAO to LIS (12h30)
