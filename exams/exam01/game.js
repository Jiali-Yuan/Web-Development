const words = require('./words');

function generateRandomWord() {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    return words[randomWordIndex];
}

function compare(guess, word) {
    let matches = 0;
    const letterCount = {};

    for (let letter of word.toLowerCase()) {
        letterCount[letter] = letterCount + 1 || 1;
    }

    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}

function equalIgnoreCase(word1, word2) {
    return word1.toLowerCase() === word2.toLowerCase();
}

function inWordList(word, wordList) {
    for (const w of wordList) {
        if (equalIgnoreCase(word, w)) {
            return true;
        }
    }
    return false;
}

function singleGame(gameId) {
    this.gameId = gameId;
    this.won = false;
    this.guessHistory = [];
    this.resultTitle = "";
    this.randomWord = generateRandomWord();
    this.checkGuess = function (guessWord) {
        if (equalIgnoreCase(guessWord, this.randomWord)) {
            this.resultTitle = "Congratulations! You won! " + guessWord + " is the word!";
            this.won = true;
        } else if (!inWordList(guessWord, words)) {
            this.resultTitle = guessWord + " is a invalid word! Try again!";
        } else {
            this.resultTitle = "Your are wrong! Try again!";
            const turns = this.guessHistory.length + 1;
            const matches = compare(guessWord, this.randomWord);
            this.guessHistory.push({ guessWord, matches, turns });
        }
    }
}

const game = {
    singleGame,
};

module.exports = game;