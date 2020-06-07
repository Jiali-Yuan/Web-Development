const gameLibrary = require('./game');

let globalGameId = 0;
const gamesInfo = {};

function gameExists(gameId) {
	const game = gamesInfo[gameId];
	return game != undefined;
}

function getGame(gameId) {
    return gamesInfo[gameId];
}

function initNewGame() {
    globalGameId += 1;
    gamesInfo[globalGameId] = new gameLibrary.singleGame(globalGameId);
    return globalGameId;
}

function takeAGuess(gameId, guessWord) {
    const game = gamesInfo[gameId];
    game.checkGuess(guessWord);
}

function resetGame(gameId) {
    gamesInfo[gameId] = new gameLibrary.singleGame(gameId);
}

const gameManager = {
    gameExists,
    getGame,
    initNewGame,
    takeAGuess,
    resetGame
}

module.exports = gameManager;
