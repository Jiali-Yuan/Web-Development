

const clientSideItems = {};

(function IIFE() {
    fetch('/session')
        .then(response => {
            if (!response.ok) {
                renderLogin();
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(items => {
            renderLogout();
            renderTitle();
            renderAdd();
            for (const key in items) {
                clientSideItems[key] = items[key];
            }
            renderList(clientSideItems);
        })
        .catch(err => renderStatus(err));

    const list = document.querySelector('.item-list');

    list.addEventListener('click', function (event) {
        const id = event.target.dataset.id;
        if (event.target.classList.contains('delete')) {
            const option = {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: new Headers({
                    'content-type': 'application/json'
                }),
            };
            fetch(`/items/${id}`, option).then(response => {
                if (response.ok || response.status === 404) {
                    delete clientSideItems[id];
                    renderList();
                } 
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err));
                }
            }).catch(err => renderStatus(err));;
        }

        if (event.target.classList.contains('update')) {
            const allQuantities = document.querySelectorAll('.quantity');
            let newQuantity = clientSideItems[id].quantity;

            for (let q of allQuantities.entries()) {
                if (q[1].dataset.id === id) {
                    newQuantity = q[1].value;
                }
            }

            const option = {
                method: 'PUT',
                body: JSON.stringify({ id: id, name: clientSideItems[id].name, quantity: newQuantity }),
                headers: new Headers({
                    'content-type': 'application/json'
                }),
            };

            fetch(`/items/${id}`, option).then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    delete clientSideItems[id];
                    renderList();
                    return response.json().then(err => Promise.reject(err));
                } else {
                    return response.json().then(err => Promise.reject(err));
                }
            }).then(item => {
                clientSideItems[item.id] = item;
                renderList();
            }).catch(err => renderStatus(err));;
        }
    });

    document.onreadystatechange = function() { 
        if (document.readyState !== "complete") { 
            document.querySelector("div").style.visibility = "hidden"; 
            document.querySelector(".loading").style.visibility = "visible"; 
        } else { 
            document.querySelector(".loading").style.display = "none"; 
            document.querySelector("div").style.visibility = "visible"; 
        } 
    }; 
}) ();

function renderLogin() {
    const login = document.querySelector('.login');
    login.innerHTML = `
            <h1>Login</h1>
            <form>
                <input class="username" value="" placeholder="Username"/>
                <button onclick="submitLogin()" type="submit">Enter</button>
            </form>
         `
    const loginButton = document.querySelector('.login button');
    const userName = document.querySelector('.username');
    userName.addEventListener('keyup', function (event) {
        const text = event.target.value;
        loginButton.disabled = !text;
    });
    loginButton.disabled = true;
};

function renderLogout() {
    const logout = document.querySelector('.logout');
    logout.innerHTML = `
            <button onclick="submitLogout()" type="submit">Logout</button>
         `
};

function renderStatus(err) {
    const status = document.querySelector('.status');
    status.innerText = err.error;
}

function renderTitle() {
    const title = document.querySelector('.title');
    title.innerHTML = `
        <h1>Items List</h1>
    `
}

function renderAdd() {
    const outgoing = document.querySelector('.outgoing');
    outgoing.innerHTML = `
            <div class="outgoing">
                <form>
                    <input class="item-name" value="" placeholder="Enter the item name" maxlength="40"/>
                    <input class="item-quantity" value="" placeholder="Enter the item quantity"/>
                    <button onclick="addItems()" type="button">Add</button>
                </form>
            </div>
         `
    const addButton = document.querySelector('.outgoing button');
    const itemName = document.querySelector('.item-name');
    itemName.addEventListener('keyup', function (event) {
        const text = event.target.value;
        addButton.disabled = !text;
    });
    addButton.disabled = true;
}

function renderList() {
    clearStatus();
    const list = document.querySelector('.item-list');
    list.innerHTML = Object.keys(clientSideItems).map((key) => {
        const item = clientSideItems[key];
        return `
      <li>
          <span data-id="${item.id}">${item.name}</span>
          <input data-id="${item.id}" class="quantity" value="${item.quantity}"/>
          <span data-id="${item.id}" class="update">Update</span>
          <span data-id="${item.id}" class="delete">X</span>
      </li>
    `;
    }).join('\n');
};

function clearPage() {
    const logout = document.querySelector('.logout');
    const status = document.querySelector('.status');
    const outgoing = document.querySelector('.outgoing');
    const list = document.querySelector('.item-list');
    const title = document.querySelector('.title');
    title.innerHTML = "";
    logout.innerHTML = "";
    status.innerText = "";
    outgoing.innerHTML = "";
    list.innerHTML = "";
}

function clearStatus() {
    const status = document.querySelector('.status');
    status.innerText = "";
}

function submitLogin() {
    const username = document.querySelector('.username');
    const option = {
        method: 'POST',
        body: JSON.stringify({ username: username.value }),
        headers: new Headers({
            'content-type': 'application/json'
        }),
    };
    fetch('/session', option).then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
    }).catch(err => renderStatus(err));
}

function submitLogout() {
    const option = {
        method: 'DELETE',
    };
    fetch('/session', option).then(response => {
        if (response.ok) {
            clearPage();
            renderLogin();
        }
    });
}

function addItems() {
    const itemName = document.querySelector('.item-name');
    const itemQuantity = document.querySelector('.item-quantity');
    const addButton = document.querySelector('.outgoing button');

    if (itemQuantity.value === '') {
        itemQuantity.value = 0;
    }

    const option = {
        method: 'POST',
        body: JSON.stringify({ name: itemName.value, quantity: itemQuantity.value }),
        headers: new Headers({
            'content-type': 'application/json'
        }),
    };
    fetch('/items', option)
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        }).then(item => {
            clientSideItems[item.id] = item;
            itemName.value = "";
            itemQuantity.value = "";
            addButton.disabled = true;
            renderList();
        }).catch(err => renderStatus(err));
}
