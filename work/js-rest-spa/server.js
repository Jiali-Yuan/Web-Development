const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static('./public'));

const cookies = [];
const serverSideItems = {};
serverSideItems[0] = { id: 0, name: 'Scottish Fold', quantity: 5 };
serverSideItems[1] = { id: 1, name: 'Gray Tabby', quantity: 6 };

function sidExists(sid) {
    return cookies.includes(sid);
}

function validUsername(username) {
    if (username === undefined || username.includes("dog") || username.includes(" ")) {
        return false;
    }
    return true;
}

function itemExists(name) {
    for (let key in serverSideItems) {
        if (serverSideItems[key].name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

const cookieCounter = () => {
    let count = 0;
    return () => {
        count += 1;
        return count.toString();
    };
};
const nextCookie = cookieCounter();

const itemIdCounter = () => {
    let count = 2;
    return () => {
        count += 1;
        return count;
    };
};
const nextItemId = itemIdCounter();

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (sid === undefined) {
        res.status(401).json({ error: "" });
        return;
    }
    if (!sidExists(sid)) {
        res.status(401).json({ error: "Bad login: invalid sid." });
        return;
    }
    res.json(serverSideItems);
});

app.post('/session', express.json(), (req, res) => {
    let username = req.body.username;
    if (!validUsername(username)) {
        res.status(401).json({ error: "Bad login: invalid username." });
        return;
    }
    let sid = nextCookie();
    cookies.push(sid);
    res.cookie("sid", sid, { maxAge: 3000000 });
    res.sendStatus(200);
});

app.delete('/session', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const index = cookies.indexOf(sid);
    if (index > -1) {
        cookies.splice(index, 1);
    }
    res.clearCookie('sid');
    res.sendStatus(200);
});

app.get('/items', (req,res) => {
    res.json(serverSideItems);
});

app.post('/items', express.json(), (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).json({ error: "'name' required" });
    } else if (itemExists(name)) {
        res.status(409).json({ error: `duplicate: ${name}!` });
    } else {
        const id = nextItemId();
        serverSideItems[id] = {id: id, name: name, quantity: req.body.quantity};
        res.status(200).json(serverSideItems[id]);
    }
});

app.delete('/items/:itemid', express.json(), (req, res) => {
    const id = req.body.id;
    if (!serverSideItems[id]) {
        res.status(404).json({error: "Item doesn't exists."});
        //return;
    } else {
        delete serverSideItems[id];
        res.sendStatus(200);
    }
});

app.put('/items/:itemid', express.json(), (req, res) => {
    const id = req.body.id;
    if (!serverSideItems[id]) {
        res.status(404).json({error: "Item doesn't exists."});
       // return;
    } else {
        serverSideItems[id] = req.body;
        res.status(200).json(serverSideItems[id]);
    }
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));