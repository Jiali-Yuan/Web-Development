const appState = {
    isLoggedIn: false,
    toLogout: false,
    addRecipe: false,
    error: '',
    clientRecipeList: {}
};

function renderHead(show) {
    const headline = document.querySelector('.headline');
    if (show) {
        headline.innerHTML = `
        <h1>My Recipes</h1>
     `;
    }else {
        headline.innerHTML = '';
    }
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
          <a data-id="${item.id}" href="#" class="to-details">${item.title}</a>
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
        renderHead(true);
    } else {
        renderLogin(true);
        renderLogout(false);
        renderNewRecipeButton(false);
        renderList();
        renderHead(true);
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
        <div class="title">
        <label>Title: <input class="add-title" value=""/></label>
        </div>
        <div class="ingredients">
        <label>Ingredients: </label><textarea class="add-ingredients" value=""></textarea>
        </div>
        <div class="instruction">
        <label>Instruction: </label><textarea class="add-instruction" value=""></textarea>
        </div>
        <button class="add-new-recipe" type="button">Add New Recipe</button>
        `
    } else {
        addPage.innerHTML = '';
    }
}

function renderDetailsPage(list) {
    const listRecipe = document.querySelector('.details-page');

    listRecipe.innerHTML = `
    <div class="detail-title">
       <span>Title: </span>
       <span>${list.title}</span>
    </div>
    <div class="detail-author">
       <span>Author: </span>
       <span>${list.author}</span>
    </div>
    <div class="detail-ingredients">
       <span>Ingredients: </span>
       <span>${list.ingredients}</span>
    </div>
    <div class="detail-instruction">
       <span>Instruction: </span>
       <span>${list.instruction}</span>
    </div>
    `;
}

function clearDetailsPage() {
    const listRecipe = document.querySelector('.details-page');
    listRecipe.innerHTML = '';
}

export {
    appState,
    clearAddPage,
    clearList,
    clearDetailsPage,
    renderDetailsPage,
    renderAddPage,
    renderErrors,
    renderList,
    renderLogin,
    renderLogout,
    renderNewRecipeButton,
    renderPage,
    renderReturnButton,
    renderHead
};
