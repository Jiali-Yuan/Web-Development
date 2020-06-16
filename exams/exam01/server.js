const express = require('express');
const app = express();
const PORT = 3000;

const gameManager = require('./game-manager');
const gameWeb = require('./game-web');

app.use(express.static('./public'));


app.get('/', (req, res) => {
  let gameId = req.query.gameId;
  if (!gameManager.gameExists(gameId)) {
    gameId = gameManager.initNewGame();
    res.redirect('/' + "?gameId=" + gameId);
    return;
  }
  const game = gameManager.getGame(gameId);
  console.log(game);
  res.send(gameWeb.gamePage(game));
});

app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
  const gameId = req.query.gameId;
  const { guessWord } = req.body;
  gameManager.takeAGuess(gameId, guessWord);
  res.redirect('/' + "?gameId=" + gameId);
});

app.post('/reset', express.urlencoded({ extended: false }), (req, res) => {
  const gameId = req.query.gameId;
  gameManager.resetGame(gameId);
  res.redirect('/' + "?gameId=" + gameId);
});
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));