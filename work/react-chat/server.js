const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.use(cookieParser());
app.use(express.static('./public'));
const chat = require('./src/chat-data');


app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !chat.users[uid]) {
        res.status(401).json({ message: chat.errorMessages.LOGIN_REQUIRED });
        return;
    }
    res.status(200).json(chat.users[uid]);
});

app.post('/login', express.json(), (req, res) => {
    const username = req.body.username;
    if (username === 'dog' || username === '') {
        res.status(403).json({ message: chat.errorMessages.USERNAME_INVALID });
        return;
    }

    const id = chat.addUser(username);
    res.cookie('uid', id);
    res.status(200).json(chat.users[id]);
});

app.post('/logout', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    chat.removeUser(uid);
    res.cookie('uid', '');
    res.sendStatus(200);
});

app.post('/addMessage', express.json(), (req, res) => {
    const text = req.body.text;
    if (text === '') {
        res.status(403).json({ message: chat.errorMessages.MESSAGE_INVALID });
        return;
    }
    const uid = req.cookies.uid;
    if (!chat.users[uid]) {
        res.status(403).json({ message: chat.errorMessages.LOGIN_UNAUTHORIZED });
        return;
    }
    const username = chat.users[uid].username;
    const message = chat.addMessage({ username, text });
    res.status(200).json(message);
});

app.get('/activeUsers', (req, res) => {
    const users = chat.users;
    let activeUsers = [];
    for (let uid in users) {
        if (users[uid].active) {
            activeUsers.push(users[uid]);
        }
    }
    res.status(200).json(activeUsers);
});

app.get('/messages', (req, res) => {
    const messages = chat.messages;
    res.status(200).json(messages);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));