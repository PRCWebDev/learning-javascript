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
