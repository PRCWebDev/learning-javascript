'use strict';

// v1 - Detailed version:
const solutionDetailed = (sentence, wordsArr) => {
  /* your code here */

  // 1. Sanitizing the "sentence" & Converting it from a String into an Array
  const sentenceToArr = sentence.toLowerCase().trim().split(' ');
  // console.log(sentenceToArr); // (3) ['dvvd', '', 'pddp']

  // 2. Helper (callback) function - takes a single word an sorts it ascending - returns a String
  const wordSorted = function (word) {
    const sortWordAscending = word.split('').sort().join('');
    // console.log(sortWordAscending); // 'ddvv' // ' ' // 'ddpp'
    return sortWordAscending;
  };
  // wordSorted('dvvd');

  // 3. Takes every element / word from the "sentenceToArr" Array (1.), applies the Helper (callback) function "wordSorted" (2.) to it and sorts it ascending - returns an Array
  const sentenceSorted = sentenceToArr.map((wordS) => wordSorted(wordS));
  // console.log(sentenceSorted); // (3) ['ddvv', '', 'ddpp']

  // 4. Takes every element / word from the given "wordsArr" Array (parameter / argument #2), applies the Helper (callback) function "wordSorted" (2.) and sorts it ascending - returns an Array
  const wordsArrSorted = wordsArr.map((wordA) => wordSorted(wordA));
  // console.log(wordsArrSorted); // (4) ['ddvv', 'cddv', 'ddvv', 'ddpp']

  // 5. Takes every element / word + index from the "wordsArrSorted" Array (4.) and, for every element / word in that Array, checks if the "sentenceSorted" Array (3.) includes that element / word. It returns an Array with the indexes of the elements or 'false'.
  const cypher = wordsArrSorted.map((wordArr, indexArr) =>
    sentenceSorted.includes(wordArr) ? indexArr : 'false'
  );
  // console.log(cypher); // (4) [0, 'false', 2, 3]

  // 6. Filters out the "cypher" Array (5.) - returns an Array that only contains the indexes
  const cypherIndex = cypher.filter((wordArr) => wordArr !== 'false');
  // console.log(cypherIndex); // (3) [0, 2, 3]
  // console.log(typeof cypherIndex[0]); 'number'

  // 7. For every element / word from the given "wordsArr" Array (parameter / argument #2) checks if the "cypherIndex" Array (6.) the index of the given element / word "wordsArr" Array. It returns an Array with the elements or -1.
  const mySol = wordsArr.map((w, i) => (cypherIndex.includes(i) ? w : -1));
  // console.log(mySol); // (4) ['ddvv', -1, 'vvdd', 'pdpd']

  // 8. Filters out the "mySol" Array (7.) - returns an Array containing only the elements that satisfies the condition: element must be different than -1
  const mySolution = mySol.filter((el, i) => el !== -1);
  console.log(mySolution); // (3) ['ddvv', 'vvdd', 'pdpd']

  return mySolution;
};

// test your solution:
solutionDetailed('dvvd  pddp', ['ddvv', 'dvcd', 'vvdd', 'pdpd']); // ['ddvv', 'vvdd', 'pddp']
// solutionDetailed('laser space', ['lazing', 'lazy', 'lacer']); // []
/*
solutionDetailed(
  'We will eat tenderising meat at Rivera with no regally plate because there is none',
  [
    'administration',
    'ingredients',
    'admit',
    'beat',
    'arrive',
    'blood',
    'door',
    'each',
    'on',
    'economic',
    'gallery',
    'edge',
    'three',
    'drop',
  ]
);

// ["ingredients", "arrive", "on", "gallery", "three"];
*/

//////////////////////////////////////////////////////////////////////////////
// v2 - Faster / trimmed version:
const solution = (sentence, wordsArr) => {
  /* your code here */
  const sentenceToArr = sentence.toLowerCase().trim().split(' ');

  const wordSorted = function (word) {
    const sortWordAscending = word.split('').sort().join('');
    return sortWordAscending;
  };

  const conditionSorted = (word) => wordSorted(word);
  const sentenceSorted = sentenceToArr.map(conditionSorted);
  const wordsArrSorted = wordsArr.map(conditionSorted);

  const cypherIndex = wordsArrSorted
    .map((wordArr, indexArr) =>
      sentenceSorted.includes(wordArr) ? indexArr : 'false'
    )
    .filter((wordArr) => wordArr !== 'false');

  const mySolution = wordsArr
    .map((w, i) => (cypherIndex.includes(i) ? w : -1))
    .filter((el, i) => el !== -1);

  console.log(mySolution);
  return mySolution;
};

// test your solution:
// solution('dvvd  pddp', ['ddvv', 'dvcd', 'vvdd', 'pdpd']); // ['ddvv', 'vvdd', 'pddp']

// solution('laser space', ['lazing', 'lazy', 'lacer']); // []

/*
solution(
  'We will eat tenderising meat at Rivera with no regally plate because there is none',
  [
    'administration',
    'ingredients',
    'admit',
    'beat',
    'arrive',
    'blood',
    'door',
    'each',
    'on',
    'economic',
    'gallery',
    'edge',
    'three',
    'drop',
  ]
);

// ["ingredients", "arrive", "on", "gallery", "three"];
*/
