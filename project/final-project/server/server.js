const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(cookieParser());
app.use(express.static('../build'));
app.use(fileUpload());

const parks = require('./parks-data');

app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !parks.users[uid]) {
        res.status(401).json({ message: "Login failed, try again!" });
        return;
    }
    res.status(200).json(parks.users[uid]);
});

app.post('/login', express.json(), (req, res) => {
    const originalUsername = req.body.username;
    
    // Sanitize before saving
    const username = originalUsername.trim();
    if (username === 'dog' || username === '') {
        res.status(403).json({ message: "Login failed, try again!" });
        return;
    }

    const id = parks.addUser(username);
    res.cookie('uid', id);
    res.status(200).json(parks.users[id]);
});

app.post('/logout', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    parks.removeUser(uid);
    res.cookie('uid', '');
    res.sendStatus(200);
});

app.get('/parks', (req, res) => {
    const parksInfo = parks.info;
    res.status(200).json(parksInfo);
});

app.get('/parks/:parkId', (req, res) => {
    const parkId = req.params.parkId;
    const park = parks.info[parkId];
    res.status(200).json(park);
});

app.post('/park', express.json(), (req, res) => {
    const parkName = req.body.parkName;
    const introduction = req.body.introduction;
    const location = req.body.location;
    if (parkName === '' || introduction === '' || location === '') {
        res.status(403).json({ message: "Please fill in all the fields!" });
        return;
    }
    const uid = req.cookies.uid;
    if (!parks.users[uid]) {
        res.status(403).json({ message: "No such user!" });
        return;
    }
    const username = parks.users[uid].username;
    const park = parks.addPark({ username, parkName, introduction, location });
    res.status(200).json(park);
});

app.post('/comment/:parkId', express.json(), (req, res) => {
    const text = req.body.text;
    if (text.trim() === '') {
        res.status(403).json({ message: "Empty comment." });
        return;
    }
    const uid = req.cookies.uid;
    if (!parks.users[uid]) {
        res.status(403).json({ message: "No such user!" });
        return;
    }
    const username = parks.users[uid].username;
    const parkId = req.params.parkId;
    const comment = parks.addComment({ parkId, username, text });
    res.status(200).json(comment);
});

app.get('/photo/:parkId', (req, res) => {
    const parkId = req.params.parkId;
    const parkPhoto = parks.photos[parkId];
    if (parkPhoto) {
        const filePath = path.join(__dirname, "photo", parkPhoto);
        res.sendFile(filePath);
    } else {
        res.sendStatus(404);
    }
});

app.post('/photo/:parkId', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }
    const myFile = req.files.file;
    const filePath = `${__dirname}/photo/${myFile.name}`;
    myFile.mv(filePath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    const parkId = req.params.parkId;
    const image = parks.addPhoto(parkId, myFile.name);
    res.status(200).json(image);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
