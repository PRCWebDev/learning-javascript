# Secret message problem

### Problem statement:

Two spies are infiltrated into a company in order to find the secret recipe of its success.

Our protagonists work undercover as simple employees but they are not allowed to use any channel of communication other than the platforms provided by the company.

So they have to find a way of communication in plain sight knowing that their messages are seen by the company.
In order to communicate they agree to use anagrams.

But deciphering the text with anagrams in it it’s pretty time consuming so they try to write a function which determines if a word is part of their decided list of anagrams.

Unfortunately they don’t succeed, so here is your part: can you help them create such a function using JS?
What is an anagram? Well, two words are anagrams of each other if they both contain the same letters.

```
E.g.:
'abba' and 'baab' are equal
'abba' and 'bbaa' are equal
'abba' and 'abbba' are NOT equal
'abba' and 'abca' are NOT equal
```

You have to write a function which finds all the anagrams of each word contained by a sentence from a list with words (IMPORTANT: the words from sentence are separated by space only).

You will be given 2 inputs: a sentence and an array with words.
You MUST return an array of all the anagrams or an empty array if there are none.

Note:

- Your solution will be tested automatically; make sure to provide running code
- Don't focus on creating any visuals, just JavaScript
- If your code hangs or takes too long to run, your solution won't be evaluated
- You're free to create additional functions, but keep `solution` as the main function

#### Have fun and good luck!

###### Radu's note - Original code from the challenge.js file:

```
const solution = (sentence, wordsArr) => {
  /* your code here */
}

// test your solution
solution('dvvd  pddp', ['ddvv', 'dvcd', 'vvdd', 'pdpd'])
// ['ddvv', 'vvdd', 'pddp']

solution('laser space', ['lazing', 'lazy', 'lacer'])
// []
solution('We will eat tenderising meat at Rivera with no regally plate because there is none',
  ['administration', 'ingredients', 'admit', 'beat', 'arrive', 'blood', 'door', 'each', 'on', 'economic', 'gallery', 'edge', 'three', 'drop'])
// ['ingredients', 'arrive', 'on', 'gallery', 'three']
```
