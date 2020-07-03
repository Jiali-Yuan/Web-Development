import {
    fetchLogIn,
    fetchLoginStatus,
    fetchAddPage,
    fetchRecipeDetails,
    fetchRecipes,
    fetchAddRecipe,
    fetchLogOut,
    fetchReturnPage
} from './services';

const appState = {
    isLoggedIn: false,
    toLogout: false,
    addRecipe: false,
    error: '',
    clientRecipeList: {}
};

function refreshData() {
    return fetchRecipes()
        .then((list) => {
            for (const key in list) {
                appState.clientRecipeList[key] = list[key];
            }
        });
}

function clearList() {
    const list = document.querySelector('.recipes-list');
    list.innerHTML = '';
}

function clearAddPage() {
    const addPage = document.querySelector('.add-page');
    addPage.innerHTML = '';
}

function renderLogin(show) {
    const login = document.querySelector('.login');
    if (show) {
        login.innerHTML = `
        <h1>Login</h1>
        <form>
            <input class="username" value="" placeholder="Username"/>
            <button class="to-login" type="button">Login</button>
        </form>
     `;
        const loginButton = document.querySelector('.login button');
        const userName = document.querySelector('.username');
        userName.addEventListener('keyup', function (event) {
            const text = event.target.value;
            loginButton.disabled = !text;
        });
        loginButton.disabled = true;
    } else {
        login.innerHTML = ``;
    }
}

function renderErrors(text) {
    document.querySelector('.status').innerHTML = text;
}

function renderLogout(show) {
    const logout = document.querySelector('.logout');
    if (show) {
        logout.innerHTML = `
    <button class="to-logout" type="button">Logout</button>
         `;
    } else {
        logout.innerHTML = '';
    }
}

function renderList() {
    const listRecipe = document.querySelector('.recipes-list');
    listRecipe.innerHTML = Object.keys(appState.clientRecipeList).map((key) => {
        const item = appState.clientRecipeList[key];
        return `
      <li>
          <span data-id="${item.id}">${item.title}</span>
          <span>${item.author}</span> 
      </li>
    `;
    }).join('\n');
}

function renderNewRecipeButton(show) {
    const newRecipeButton = document.querySelector('.new-recipe');
    if (show) {
        newRecipeButton.innerHTML = `
        <button class="new-recipe-button" type="button">New Recipe</button>
        `
    } else {
        newRecipeButton.innerHTML = '';
    }
}

function renderPage() {
    if (appState.isLoggedIn) {
        renderLogin(false);
        renderLogout(true);
        renderNewRecipeButton(true);
        renderList();
    } else {
        renderLogin(true);
        renderLogout(false);
        renderNewRecipeButton(false);
        renderList();
    }
    renderErrors(appState.error);
}

function renderReturnButton(show) {
    const returnButton = document.querySelector('.return-button');
    if (show) {
        returnButton.innerHTML = `
    <button class="return" type="button">Home Page</button>
    `
    } else {
        returnButton.innerHTML = '';
    }
}

function renderAddPage(show) {
    const addPage = document.querySelector('.add-page');
    if (show) {
        addPage.innerHTML = `
        <label>Title: <input class="add-title" value=""/></label>
        <label>Ingredients: </label><textarea class="add-ingredients" value=""></textarea>
        <label>Instruction: </label><textarea class="add-instruction" value=""></textarea>
        <button class="add-new-recipe" type="button">Add New Recipe</button>
        `
    } else {
        addPage.innerHTML = '';
    }
}

//render detail page
function renderDetailsPage(list) {
    const listRecipe = document.querySelector('.details-page');

    listRecipe.innerHTML = list.map((item) => {
        return `
      <li>
          <span class="detail-title">${item.title}</span>
          <span class="detail-author">${item.author}</span> 
          <p class="detail-ingredients">${item.ingredients}</p>
          <p class="detail-instruction">${item.instruction}</p>

      </li>
    `;
    }).join('\n');
}

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
            renderReturnButton(false);
            renderAddPage(false);
            renderPage();
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
        });
});

const list = document.querySelector('.recipes-list');
list.addEventListener('click', function (event) {

    const id = event.target.dataset.id;
    if (event.target.classList.contains(`${list[id].title}`)) {
        fetchRecipeDetails()
            .then((list) => {
                appState.isLoggedIn = false;
                appState.error = '';
                appState.toLogout = false;
                clearList();
                renderLogin(false);
                renderLogout(false);
                renderNewRecipeButton(false);
                renderReturnButton(true);
                renderDetailsPage(list);
            });
    }
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