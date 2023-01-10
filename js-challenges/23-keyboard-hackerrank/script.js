'use strict';

/*
HackerRank Keyboard Challenge - Challenge resume: 

You have a 3x3 keypad of numbers 1-9.
The numbers are jumbled.
It takes:
- 0 seconds to move your finger to the first key
- 0 seconds to press the key where your finger is located ANY number of times
- 1 second to move your finger from a key to ANY adjacent key, INCLUDING THOSE ON A DIAGONAL
- 2 seconds to move your finger from a key to ANY NON-adjacent key


Write a function that takes 2 inputs: a STRING OF NUMBERS that will be keyed in and a STRING OF NUMBERS representing the keypad order.

Return the number of SECONDS it takes to move your finger from key to key and enter the given STRING OF NUMBERS.
*/

function entryTime(s, keypad) {
  const digitsArr = keypad.toString().split('');
  // console.log(digitsArr);
  // console.log(digitsArr.length);
  // console.log(digitsArr[0]);
  // console.log(digitsArr[1]);

  const str = s.toString();
  // console.log(str);
  // console.log(str.length);
  // console.log(str[0]);
  // console.log(str[1]);

  const obj = {};
  obj[digitsArr[0]] = [0, 0];
  // console.log(obj);
  obj[digitsArr[1]] = [1, 0];
  // console.log(obj);
  obj[digitsArr[2]] = [2, 0];
  obj[digitsArr[3]] = [0, 1];
  obj[digitsArr[4]] = [1, 1];
  obj[digitsArr[5]] = [2, 1];
  obj[digitsArr[6]] = [0, 2];
  obj[digitsArr[7]] = [1, 2];
  obj[digitsArr[8]] = [2, 2];
  // console.log(obj[9]);
  // console.log(obj);
  //  1   2   3
  //  4   5   6
  //  7   8   9

  let time = 0;
  let position = obj[str[0]]; // obj[4] = [2, 2] // obj[5] = [1, 1] //  obj[6] =
  // console.log(position);

  for (let i = 1; i < str.length; i++) {
    let num = str[i];
    // console.log(num); // 2 3 6 2 9 // 1 1 1 // 3 9 4 8 5 7 1 2

    let newPosition = obj[num];
    // console.log(newPosition); // [1, 0] [2, 0] [0, 2] [1, 0] [0, 0]
    // obj[num] = obj[2] = [1, 0]
    // obj[num] = obj[3] = [2, 0]
    // obj[num] = obj[6] = [0, 2]
    // obj[num] = obj[2] = [1, 0]
    // obj[num] = obj[9] = [0, 0]

    // !!!X & Y are Reversed :D => QUICK FIX === REPLACE BELOW (on the next lines) "movePosX" WITH "movePosY" AND vice-versa !!!
    let movePosX = Math.abs(position[0] - newPosition[0]);
    let movePosY = Math.abs(position[1] - newPosition[1]);
    // console.log(position[0], position[1]); // AKA: // console.log(obj[str[0]][0], obj[str[0]][1]);  // AKA: console.log(obj[4][0], obj[4][1]); // 2 2
    // position[0] = obj[str[0]][0] = 2
    // position[0] = obj[str[0]][1] = 2

    // !!! position = newPosition; // OR ELSE we go back to the initial position and we mess up the time count !!!

    // console.log(newPosition[0], newPosition[1]); // AKA: // console.log(obj[str[1]][0], obj[str[1]][1]); // AKA: console.log(obj[4][0], obj[4][1]); // 1 0
    // newPosition[0] = obj[str[1]][0] = 1
    // newPosition[1] = obj[str[1]][1] = 0

    // console.log(obj[str[2]][0], obj[str[2]][1]); // 2 0
    // console.log(obj[str[3]][0], obj[str[3]][1]); // 1 0
    // console.log(obj[str[4]][0], obj[str[4]][1]); // 0 2
    // console.log(obj[str[5]][0], obj[str[5]][1]); // 0 0
    // !!! i < str.length => i < 6 => END of Loop !!!

    if (movePosX === 1 && movePosY === 1) {
      time += 1;
      // console.log(time);
    } else if (movePosX >= 1 && movePosY >= 1) {
      time += 2;
      // console.log(time);
    } else {
      time += movePosX + movePosY;
      // time += 0; // INCORRECT
      // console.log(time);
    }

    position = newPosition; // OR ELSE we go back to the initial position and we mess up the time count
  }

  return time;
}

console.log(entryTime(423629, 923857614)); // 8
console.log(entryTime(5111, 752961348)); // 1
console.log(entryTime(91566165, 639485712)); // 11
