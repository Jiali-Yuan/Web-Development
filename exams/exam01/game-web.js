const words = require('./words');

const gameWeb = {
    gamePage: function (game) {
        return `
        <!DOCTYPE html>
        <html>
           <head>
               <link rel="stylesheet" href="/game.css"/>
               <title>Word Guessing Game</title>
           </head>
           <body>
             <div id="game-app">
               <h1>Word Guessing Game</h1>
               <div class="description">
                   <p>There is a random word from words library, try to guess it!</p>
               </div>    
               <div class="game-panel">
                   ${gameWeb.getOutGoing(game)}
                   <div class="display-panle">
                        <div class="warning-result">
                           ${gameWeb.getLastResult(game)}
                        </div>  
                        <div class="result-title">
                            <span class="guess-title">Previous Guess<span>
                            <span class="match-title">Number of Letters Matched<span>
                            <span class="turns-title">Turns<span>
                        </div>
                        <div class="result-list">
                            ${gameWeb.getMatchedResultList(game)}
                        </div>
                   </div>
               </div>
               <div class="library-title">
                   <span>Words Library</span>
               </div>
               <div class="words-library">
                   ${gameWeb.getWordsLibrary(game)}
               </div>
               <div class="reset">
                   ${gameWeb.getResetGame(game)}
               </div>
            </div>
          </body>
        </html>
        `;
    },

    getLastResult: function (game) {
        return  `<p>${game.resultTitle}</p>`;
    },

    getOutGoing: function (game) {
        return `
            <div class="outgoing">
                   <form action="/guess?gameId=${game.gameId}" method="POST">
                     <label class="enter-label">Enter a guess: </label>
                     <input class="to-submit" name="guessWord" value="" placeholder="Enter your word"/>
                     <button type="submit">SUBMIT GUESS</button>
                   </form>
            </div>
        `;
    },

    getMatchedResultList: function (game) {
        return `<ol class="relsult-panel">` +
        game.guessHistory.slice().reverse().map(result => `
        <li>
          <div class="result">
            <div class="last-guess">
                <span class="word">${result.guessWord}</span>
            </div>
            <div class="matches">
                <span>${result.matches}</span>
            </div>
            <div class="turns">
                <span> ${result.turns}</span>
            </div>
          </div>
        </li>
      `).join('') +
            `</ol>`;
    },

    getWordsLibrary: function() {
        return words.map(word => `<span>${word}</span>`);
    },

    getResetGame: function(game) {
        if (game.won === true) {
            return `
            <form action="/reset?gameId=${game.gameId}" method="post">
                 <button type="submit">RESET</button>
            </form>
            `;
        }
        return '';
    }
};
module.exports = gameWeb;