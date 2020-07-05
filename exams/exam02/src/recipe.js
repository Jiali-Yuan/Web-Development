import {
    fetchLogIn,
    fetchLoginStatus,
    fetchRecipes,
    fetchAddRecipe,
    fetchLogOut,
    fetchReturnPage
} from './services';

import {
    appState,
    clearAddPage,
    clearList,
    clearDetailsPage,
    renderDetailsPage,
    renderAddPage,
    renderErrors,
    renderLogout,
    renderNewRecipeButton,
    renderPage,
    renderReturnButton,
    renderHead
} from './recipe-web.js';

function refreshData() {
    return fetchRecipes()
        .then((list) => {
            for (const key in list) {
                appState.clientRecipeList[key] = list[key];
            }
        });
}

const detailButton = document.querySelector('.recipes-list');
let firstClick = true;
console.log(detailButton);
detailButton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    console.log(e.target);
    if (firstClick) {
        fetchRecipes()
            .then((list) => {
                renderDetailsPage(list[id]);
                firstClick = false;
            });
    } else {
        clearDetailsPage();
        firstClick = true;
    }
});

//to add new recipe button handler
const newRecipeButton = document.querySelector('.new-recipe');
newRecipeButton.addEventListener('click', (e) => {
    if (!e.target.classList.contains('new-recipe-button')) {
        return;
    }
    clearList();
    renderLogout(false);
    renderAddPage(true);
    renderReturnButton(true);
    renderNewRecipeButton(false);
    renderHead(false);
    clearDetailsPage();
})

//add new recipe button handler
const addNewRecipe = document.querySelector('.add-page');
addNewRecipe.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-new-recipe')) {
        return;
    }

    const title = document.querySelector('.add-title');
    const ingredients = document.querySelector('.add-ingredients');
    const instruction = document.querySelector('.add-instruction');


    fetchAddRecipe(title, ingredients, instruction)
        .then((list) => {
            const id = list.id;
            const author = list.author;
            appState.clientRecipeList[id] = {
                id: id, title: title.value, author: author,
                ingredients: ingredients.value, instruction: instruction.value
            };
            appState.error = '';
            renderReturnButton(false);
            renderAddPage(false);
            renderPage();
        })
        .catch(() => {
            appState.error = 'All fields required';
            renderErrors(appState.error);
        });
})

//return home page button
const returnButton = document.querySelector('.return-button');
returnButton.addEventListener('click', (e) => {
    if (!e.target.classList.contains('return')) {
        return;
    }
    fetchReturnPage()
        .then((list) => {
            appState.isLoggedIn = true;
            appState.error = '';
            appState.toLogout = true;
            renderReturnButton(false);
            clearAddPage();
            renderPage();
        });
})

//login button
const login = document.querySelector('.login');
login.addEventListener('click', (e) => {
    if (!e.target.classList.contains('to-login')) {
        return;
    }

    const username = login.querySelector('input').value;
    fetchLogIn(username)
        .then((list) => {
            appState.isLoggedIn = true;
            appState.error = '';
            appState.toLogout = true;
            appState.clientRecipeList = list;
            renderPage();
            clearDetailsPage();
        })
        .catch(() => {
            appState.error = 'Login failed';
            renderPage();
        });
});

//logout button
const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
    if (!e.target.classList.contains('to-logout')) {
        return;
    }

    fetchLogOut()
        .then(() => {
            appState.isLoggedIn = false;
            appState.error = '';
            appState.toLogout = false;
            renderPage();
            renderHead(true);
        });
});

fetchLoginStatus()
    .then(() => {
        appState.isLoggedIn = true;
        refreshData().then(() => { renderPage() });
    })
    .catch(() => {
        appState.isLoggedIn = false;
        refreshData().then(() => { renderPage() });
    });