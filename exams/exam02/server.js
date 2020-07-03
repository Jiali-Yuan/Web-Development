const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
const recipes = require('./recipes');
const { v4: uuidv4 } = require('uuid');

const Counter = () => {
    let count = 2;
    return () => {
        count += 1;
        return count;
    };
};
const nextTitleId = Counter();

//init
app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(401).json({ code: 'provide-error' });
        return;
    }
    if (!recipes.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json({ code: 'provide-error' });
        return;
    }
    res.sendStatus(200);
});

//login
app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if (username === 'dog' || username === ' ') {
        res.status(403).json({ code: 'provide-error' });
        return;
    }
    const uid = uuidv4();
    const recipeList = recipes.recipeList;
    recipes.users[uid] = {uid: uid, username: username};
    res.cookie('uid', uid);
    res.json(recipeList);
});

//logout
app.delete('/session', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    res.clearCookie('uid');
    res.sendStatus(200);
});

//Get recipes list
app.get('/recipes', (req, res) => {
    res.status(200).json(recipes.recipeList);
});

//Add new recipe
app.post('/recipes', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const author = recipes.users[uid].username;
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instruction = req.body.instruction;
    
    if (!title || !ingredients || !instruction) {
        res.status(400).json({ code: "provide-error" });
    } else {
        const id = nextTitleId();
        const newRecipe = {
            id: id, title: title, author: author,
            ingredients: ingredients, instruction: instruction
        };
        recipes.recipeList[id] = newRecipe;
        res.status(200).json(recipes.recipeList[id]);
    }
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));