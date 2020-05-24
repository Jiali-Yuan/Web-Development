"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  word = word.toLowerCase();
  guess = guess.toLowerCase();

  let firstWord = {};
  word.split('').forEach(function (letter) {
    if (!(letter in firstWord)) {
      firstWord[letter] = 0;
    }
    firstWord[letter] += 1;
  });

  let count = 0;

  guess.split('').forEach(function (letter) {
    if (firstWord[letter] > 0) {
      count += 1;
      firstWord[letter] -= 1;
    }
  });
  return count;
}
