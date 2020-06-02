const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat');
const chatWeb = require('./chat-web');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});

app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const sender = '1'; // Hardcode until we add a login
  const { text } = req.body;
  chat.addMessage({ sender, text, timestamp: new Date() });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
