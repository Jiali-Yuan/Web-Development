const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static('./build'));

const users = {};
const messages = [
  { username: 'one',
    message: 'hi'
   }
];
const isTyping = {};

app.post('/login', express.json(), (req, res) => {
  const { username } = req.body;
  users[username] = true;
  res.json(messages);
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', express.json(), (req, res) => {
  const { username, message } = req.body;
  messages.push({ username, message });
  delete isTyping[username];
  res.json(messages);
});

app.post('/typing', express.json(), (req, res) => {
  const { username } = req.body;
  isTyping[username] = true;
  setTimeout( () => { delete isTyping[username]; }, 10000); // buggy, but gives idea
  res.json(messages);
});

app.get('/typing', (req, res) => {
  res.json(Object.keys(isTyping));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );
