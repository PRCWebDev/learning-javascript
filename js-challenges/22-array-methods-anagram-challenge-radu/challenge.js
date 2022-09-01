"use strict";

// v1 - Detailed version:
const solutionDetailed = (sentence, wordsArr) => {
  /* your code here */
  const sentenceToArr = sentence.toLowerCase().trim().split(" ");
  // console.log(sentenceToArr);

  const wordSorted = function (word) {
    const sortWordAscending = word.split("").sort().join("");
    // console.log(sortWordAscending);
    return sortWordAscending;
  };
  // wordSorted("dvvd");

  const sentenceSorted = sentenceToArr.map((wordS) => wordSorted(wordS));
  // console.log(sentenceSorted);

  const wordsArrSorted = wordsArr.map((wordA) => wordSorted(wordA));
  // console.log(wordsArrSorted);

  const cypher = wordsArrSorted.map((wordArr, indexArr) =>
    sentenceSorted.includes(wordArr) ? indexArr : "false"
  );
  // console.log(cypher);

  const cypherIndex = cypher.filter((wordArr) => wordArr !== "false");
  // console.log(cypherIndex); // (5) [1, 4, 8, 10, 12]
  // console.log(typeof cypherIndex[0]);

  const mySol = wordsArr.map((w, i) => (cypherIndex.includes(i) ? w : -1));
  // console.log(mySol);
  const mySolution = mySol.filter((el, i) => el !== -1);
  console.log(mySolution);
  return mySolution;
};

//////////////////////////////////////////////////////////////////////////////
// v2 - Faster / trimmed version:
const solution = (sentence, wordsArr) => {
  /* your code here */
  const sentenceToArr = sentence.toLowerCase().trim().split(" ");

  const wordSorted = function (word) {
    const sortWordAscending = word.split("").sort().join("");
    return sortWordAscending;
  };

  const conditionSorted = (word) => wordSorted(word);
  const sentenceSorted = sentenceToArr.map(conditionSorted);
  const wordsArrSorted = wordsArr.map(conditionSorted);

  const cypherIndex = wordsArrSorted
    .map((wordArr, indexArr) =>
      sentenceSorted.includes(wordArr) ? indexArr : "false"
    )
    .filter((wordArr) => wordArr !== "false");

  const mySolution = wordsArr
    .map((w, i) => (cypherIndex.includes(i) ? w : -1))
    .filter((el, i) => el !== -1);
  console.log(mySolution);
  return mySolution;
};

// test your solution:
// solutionDetailed("dvvd  pddp", ["ddvv", "dvcd", "vvdd", "pdpd"]);
//////////////////////////////////////////////////////////////////////////////
solution("dvvd  pddp", ["ddvv", "dvcd", "vvdd", "pdpd"]);
// ['ddvv', 'vvdd', 'pddp']

// solutionDetailed("laser space", ["lazing", "lazy", "lacer"]);
//////////////////////////////////////////////////////////////////////////////
solution("laser space", ["lazing", "lazy", "lacer"]);
// []

/*
solutionDetailed(
  "We will eat tenderising meat at Rivera with no regally plate because there is none",
  [
    "administration",
    "ingredients",
    "admit",
    "beat",
    "arrive",
    "blood",
    "door",
    "each",
    "on",
    "economic",
    "gallery",
    "edge",
    "three",
    "drop",
  ]
);
*/
//////////////////////////////////////////////////////////////////////////////
solution(
  "We will eat tenderising meat at Rivera with no regally plate because there is none",
  [
    "administration",
    "ingredients",
    "admit",
    "beat",
    "arrive",
    "blood",
    "door",
    "each",
    "on",
    "economic",
    "gallery",
    "edge",
    "three",
    "drop",
  ]
);
// ["ingredients", "arrive", "on", "gallery", "three"];
