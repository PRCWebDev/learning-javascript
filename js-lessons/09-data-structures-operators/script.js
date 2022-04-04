"use strict";

/*
// Radu - Arrays Recap
const lastName = "Schedtmann";

const calcAge = function (birthYear) {
  const age = 2022 - birthYear;
  return age;
};
console.log(calcAge(1984));


const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

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

  // greet: () => console.log(`Welcome to !`),
  greet: function (friend) {
    console.log(`Welcome, ${friend}, to ${this.name}!`);
  },
};
// restaurant.greet("lastName");
restaurant.greet(lastName);

const testRadu = [
  "jonas",
  lastName,
  1 > 0,
  calcAge,
  calcAge(2000),
  restaurant,
  restaurant.name,
  restaurant.greet,
];
console.log(testRadu);
*/

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

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
    time = "DefaultValue",
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
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

///////////////////////////////////////
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

///////////////////////////////////////
// 2. Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//  2.1. Renaming variables from Object Properties
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// 2.2. Setting Default Values for the variables when we are Destructuring them from an aray
const { menu = [1], starterMenu: starters = [] } = restaurant; // menu does not exist in the current "restaurant" Object so we are setting the Default value to "empty"
console.log(menu, starters);
/*
// Radu - extra
const {
  name2: restaurantName2 = ["Default1"],
  location2: restaurantLocation = [2],
  menu2 = [true],
} = restaurant; // adding more non-existing Object Properties the current "restaurant" Object & setting them to different Default values
console.log(restaurantName2, restaurantLocation, menu2);
*/

// 2.3. Switching / Mutating variables while Destructuring Objects
let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };

// we MUST USE PARENTHESIS for this to work
({ d, e } = obj);
console.log(d, e);

// 2.4. Destructuring Nested Objects
const { fri } = openingHours;
console.log(fri);
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
// also renaming the Object Properties inside the "fri" Nested Object
const {
  fri: { open: O, close: C },
} = openingHours;
console.log(O, C);

// 2.5. A Practical application of Destructuring Objects
// instead of defining multiple parameters manually, we can PASS AN OBJECT into the Function as an ARGUMENT and CALL the Function
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Mare, 17",
  mainIndex: 2,
  starterIndex: 2,
});

// we also have set Default Values for some of the variables to be displayed
restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
});

///////////////////////////////////////
// 3. The Spread Operator
// The Spread Operator WORKS on ALL ITERABLES (Arrays, Strings, Maps, Sets etc.) but ALSO on OBJECTS (since ES2018)

// 3.1. Before & After the Spread Operator
// 3.1.1. Before the Spread Operator
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

// 3.1.2. After the Spread Operator
const newArr = [1, 2, ...arr2];
console.log(newArr);

// 3.2. Using the Spread Operator to UNPACK ITERABLES (Strings, Arrays, Maps, Sets etc., BUT ALSO OBJECTS (since ES2018))
// 3.2.1. Unpacking a String
const firstName = "Jonas";
console.log(...firstName); // displays "J o n a s" (with space between the letters)
// 3.2.2. Unpacking an Array
console.log(...newArr); // displays "1 2 7 8 9" (with space between the numbers)
// 3.2.3. Unpacking an Object
// console.log(restaurant);
// console.log(...restaurant); // we CANNOT UNPACK an Object !!AND!! Display it DIRECTLY to the console (like we did with the OTHER ITERABLES) - see 3.5.3. for more...

// 3.5. Using the Spread Operator on ARRAYS
// 3.2.3. Creating a NEW Array by Copying an old one, UNPACKED with the Spread Operator & Adding a NEW item to the "mainMenu" Property
const newMenu = [...restaurant.mainMenu, "Gnocci"];
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
  // prompt("Insert ingredient 2:"),
  // prompt("Insert ingredient 3:"),
];
console.log(ingredients);

// without using the Spread Operator
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
console.log("restaurant Object Copy:", restaurantCopy);
console.log("initial restaurant Object:", restaurant);

// PROOF that this Method of copying Objects is also SHALLOW (just like the "Object.assign" Method) & also modifies the original "restaurant" Object. This only modifies the Object on a surface level, not on a DEEP level. We need a more complex Method to copy Objects that we will learn later on...
restaurantCopy.starterMenu.push("Salads");
console.log(restaurantCopy.starterMenu);
console.log(restaurant.starterMenu);

// 3.5.2. Creating a NEW Object by Copying an old one, UNPACKED with the Spread Operator & Adding new Properties to it - also SHALLOW Copy (just like the "Object.assign" Method)
const newRestaurant = { foundedIn: 1919, ...restaurant, founder: "Giuseppe" }; // the order in which we add the new Properties is NOT important
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
restaurantCopy.name = "Ristorante Roma";
restaurantCopy.founder = "Romeo";
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

///////////////////////////////////////
// 4. Rest Pattern / Operator and Parameters
// 4.1. Using Destructuring !!AND!! the Rest Operator

// SPREAD, because "..." on RIGHT side of "="
// const arr = [1, 2, ...[3, 4]];

// REST, because "..." on LEFT side of "="
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// 4.1.1. Using Destructuring !!AND!! the Rest Operator in Arrays
// in an Array, variables can have ANY name
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// // 4.1.2. Using Destructuring !!AND!! the Rest Operator in Objects
// in an Object, the DESTRUCTERED Property from the Object MUST HAVE the SAME name as INSIDE that Object, WHILE the RESTED Object can have ANY name
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 4.2. Using the Rest Operator in Functions - REST PARAMETERS
const add = function (...numbers) {
  // "numbers" is an Array created with the REST Operator
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3); // displays an ARRAY [2, 3]
add(5, 3, 7, 2); // displays an ARRAY [5, 3, 7, 2]
add(8, 2, 5, 3, 2, 1, 4); // displays an ARRAY [8, 2, 5, 3, 2, 1, 4]

const xx = [23, 5, 7];
// const xx = [23, 5, 7, 222, 333];
add(...xx);
// 1) the SPREAD Operator is used here to UNPACK the "xx" Array and PASS it's VALUES as ARGUMENTS in the "add" Function Call
// 2) the "add" Function receives the values as PARAMETERS
// the REST Operator PACKS the received values (aka REST PARAMETERS) into an Array (aka "numbers") so that the "for" loop can iterate through that Array and display the SUM of the values to the console

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach"); // displays "mushrooms" as "mainIngredient" & ["onion", "olives", "spinach"] as the "otherIngredients" Array
restaurant.orderPizza("mushrooms"); // displays "mushrooms" as "mainIngredient" & [] as the "otherIngredients" Array (empty array)

/*
// 4.3. Conclusions:
* The DIFFERENCES between the REST Operator & the SPREAD Operator:
1) REST is the OPPOSITE of SPREAD
2) REST is on the LEFT of the "=" while SPREAD is on the RIGHT of the "="
3) REST PACKS (ONLY into an ARRAY ) while SPREAD UNPACKS (from ALL ITERABLES and OBJECTS)
4) REST = VARIABLES + "," while SPREAD = VALUES + ","

* WE CANNOT USE the REST Operator OR the SPREAD Operator inside Template Literals :(
*/
