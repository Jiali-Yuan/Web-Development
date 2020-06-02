const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

function userListTemplate() {
  return `
        <ul class="users">
          <li>
            <div class="user">
              <span class="username">Amit</span>
            </div>
          </li>
          <li>
            <div class="user">
              <span class="username">Bao</span>
            </div>
          </li>
        </ul>
  `;
}

function messageListTemplate() {
  return `
        <ol class="messages">
          <li>
            <div class="message">
              <div class="meta-info">
                <div class="sender-info">
                  <span class="username">Amit</span>
                </div>
                <div class="message-info">
                  <span class="timestamp">18:45:32</span>
                </div>
              </div>
              <p class="message-text">You up?</p>
            </div>
          </li>
          <li>
            <div class="message">
              <div class="meta-info">
                <div class="sender-info">
                  <span class="username">Bao</span>
                </div>
                <div class="message-info">
                  <span class="timestamp">18:46:50</span>
                </div>
              </div>
              <p class="message-text">Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos</p>
            </div>
          </li>
        </ol>
  `;
}

function outgoingTemplate() {
  return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button type="submit">Send</button>
        </form>
      </div>
      `;
}

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/chat.css"/>
    <title>Chat</title>
  </head>
  <body>
    <div id="chat-app">
      <div class="display-panel">
        ${userListTemplate()}
        ${messageListTemplate()}
      </div>
      ${outgoingTemplate()}
    </div>
  </body>
</html>
  `);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


