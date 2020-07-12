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
    clearDetailsPage,
    clearList,
    renderAddPage,
    renderDetailsPage,
    renderErrors,
    renderHead,
    renderLogin,
    renderLogout,
    renderPage,
    renderReturnButton,
    renderNewRecipeButton,
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
detailButton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    if (id === undefined) {
        return;
    }
    fetchRecipes()
        .then((list) => {
            clearList();
            renderHead(false);
            renderLogout(false);
            renderNewRecipeButton(false);
            renderLogin(false);
            renderDetailsPage(list[id]);
            renderReturnButton(true);
            renderErrors('');
        });
});

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
            renderDetailsPage(list);
            renderAddPage(false);
            renderReturnButton(true);
            renderErrors('');
        })
        .catch(() => {
            appState.error = 'All fields required';
            renderErrors(appState.error);
        });
})

const returnButton = document.querySelector('.return-button');
returnButton.addEventListener('click', (e) => {
    if (!e.target.classList.contains('return')) {
        return;
    }
    fetchReturnPage()
        .then(() => {
            if (appState.isLoggedIn) {
                appState.error = '';
                renderReturnButton(false);
                clearAddPage();
                clearDetailsPage();
                renderPage();
            } else {
                appState.error = '';
                renderReturnButton(false);
                clearDetailsPage();
                renderPage();
            }
        });
})

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
            appState.clientRecipeList = list;
            renderPage();
            clearDetailsPage();
        })
        .catch(() => {
            appState.error = 'Login failed, try again';
            renderPage();
        });
});

const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
    if (!e.target.classList.contains('to-logout')) {
        return;
    }

    fetchLogOut()
        .then(() => {
            appState.isLoggedIn = false;
            appState.error = '';
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