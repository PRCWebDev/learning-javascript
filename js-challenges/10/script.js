"use strict";

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1; // using the REST Operator (left side of "=")
console.log(gk);
console.log(fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2]; // using the SPREAD Operator (right side of "=")
console.log(allPlayers);

// 4.
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5.
// Destructuring Nested Objects
const {
  odds: { team1, x: draw, team2 },
} = game;
// OR Radu
// const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6.
// using REST Parameters
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
};

// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored); // using the SPREAD Operator

// 7.
team1 < team2 && console.log(`${game.team1} wins the game.`);
team1 > team2 && console.log(`${game.team2} wins the game.`);
