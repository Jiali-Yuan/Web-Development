/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  isLoggedIn: false,
  toLogout: false,
  addRecipe: false,
  error: '',
  clientRecipeList: {}
};

function refreshData() {
  return Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (list) {
    for (var key in list) {
      appState.clientRecipeList[key] = list[key];
    }
  });
}

function clearList() {
  var list = document.querySelector('.recipes-list');
  list.innerHTML = '';
}

function clearAddPage() {
  var addPage = document.querySelector('.add-page');
  addPage.innerHTML = '';
}

function renderLogin(show) {
  var login = document.querySelector('.login');

  if (show) {
    login.innerHTML = "\n        <form>\n            <input class=\"username\" value=\"\" placeholder=\"Username\"/>\n            <button class=\"to-login\" type=\"button\">Login</button>\n        </form>\n     ";
    var loginButton = document.querySelector('.login button');
    var userName = document.querySelector('.username');
    userName.addEventListener('keyup', function (event) {
      var text = event.target.value;
      loginButton.disabled = !text;
    });
    loginButton.disabled = true;
  } else {
    login.innerHTML = "";
  }
}

function renderErrors(text) {
  document.querySelector('.status').innerHTML = text;
}

function renderLogout(show) {
  var logout = document.querySelector('.logout');

  if (show) {
    logout.innerHTML = "\n    <button class=\"to-logout\" type=\"button\">Logout</button>\n         ";
  } else {
    logout.innerHTML = '';
  }
}

function renderList() {
  var listRecipe = document.querySelector('.recipes-list');
  listRecipe.innerHTML = Object.keys(appState.clientRecipeList).map(function (key) {
    var item = appState.clientRecipeList[key];
    return "\n      <li>\n          <a data-id=\"".concat(item.id, "\" href=\"#\" class=\"to-details\">").concat(item.title, "</a>\n          <span>").concat(item.author, "</span> \n      </li>\n    ");
  }).join('\n');
}

function renderNewRecipeButton(show) {
  var newRecipeButton = document.querySelector('.new-recipe');

  if (show) {
    newRecipeButton.innerHTML = "\n        <button class=\"new-recipe-button\" type=\"button\">New Recipe</button>\n        ";
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
  var returnButton = document.querySelector('.return-button');

  if (show) {
    returnButton.innerHTML = "\n    <button class=\"return\" type=\"button\">Home Page</button>\n    ";
  } else {
    returnButton.innerHTML = '';
  }
}

function renderAddPage(show) {
  var addPage = document.querySelector('.add-page');

  if (show) {
    addPage.innerHTML = "\n        <label>Title: <input class=\"add-title\" value=\"\"/></label>\n        <label>Ingredients: </label><textarea class=\"add-ingredients\" value=\"\"></textarea>\n        <label>Instruction: </label><textarea class=\"add-instruction\" value=\"\"></textarea>\n        <button class=\"add-new-recipe\" type=\"button\">Add New Recipe</button>\n        ";
  } else {
    addPage.innerHTML = '';
  }
} //render detail page


function renderDetailsPage(list) {
  var listRecipe = document.querySelector('.details-page');
  listRecipe.innerHTML = "\n    <div class=\"detail-title\">\n       <span>Title: </span>\n       <span>".concat(list.title, "</span>\n    </div>\n    <div class=\"detail-author\">\n       <span>Author: </span>\n       <span>").concat(list.author, "</span>\n    </div>\n    <div class=\"detail-ingredients\">\n       <span>Ingredients: </span>\n       <span>").concat(list.ingredients, "</span>\n    </div>\n    <div class=\"detail-instruction\">\n       <span>Instruction: </span>\n       <span>").concat(list.instruction, "</span>\n    </div>\n    ");
}

function clearDetailsPage() {
  var listRecipe = document.querySelector('.details-page');
  listRecipe.innerHTML = '';
}

var detailButton = document.querySelector('.recipes-list');
var first = true;
detailButton.addEventListener('click', function (e) {
  var id = e.target.dataset.id;
  e.preventDefault();

  if (first) {
    Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (list) {
      renderDetailsPage(list[id]);
      first = false;
    });
  } else {
    clearDetailsPage();
    first = true;
  }
}); //to add new recipe button handler

var newRecipeButton = document.querySelector('.new-recipe');
newRecipeButton.addEventListener('click', function (e) {
  if (!e.target.classList.contains('new-recipe-button')) {
    return;
  }

  clearList();
  renderLogout(false);
  renderAddPage(true);
  renderReturnButton(true);
  renderNewRecipeButton(false);
}); //add new recipe button handler

var addNewRecipe = document.querySelector('.add-page');
addNewRecipe.addEventListener('click', function (e) {
  if (!e.target.classList.contains('add-new-recipe')) {
    return;
  }

  var title = document.querySelector('.add-title');
  var ingredients = document.querySelector('.add-ingredients');
  var instruction = document.querySelector('.add-instruction');
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipe"])(title, ingredients, instruction).then(function (list) {
    var id = list.id;
    var author = list.author;
    appState.clientRecipeList[id] = {
      id: id,
      title: title.value,
      author: author,
      ingredients: ingredients.value,
      instruction: instruction.value
    };
    appState.error = '';
    renderReturnButton(false);
    renderAddPage(false);
    renderPage();
  })["catch"](function () {
    appState.error = 'All fields required';
    renderErrors(appState.error);
  });
}); //return home page button

var returnButton = document.querySelector('.return-button');
returnButton.addEventListener('click', function (e) {
  if (!e.target.classList.contains('return')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchReturnPage"])().then(function (list) {
    appState.isLoggedIn = true;
    appState.error = '';
    appState.toLogout = true;
    renderReturnButton(false);
    clearAddPage();
    renderPage();
  });
}); //login button

var login = document.querySelector('.login');
login.addEventListener('click', function (e) {
  if (!e.target.classList.contains('to-login')) {
    return;
  }

  var username = login.querySelector('input').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function (list) {
    appState.isLoggedIn = true;
    appState.error = '';
    appState.toLogout = true;
    appState.clientRecipeList = list;
    renderPage();
  })["catch"](function () {
    appState.error = 'Login failed';
    renderPage();
  });
}); //logout button

var logout = document.querySelector('.logout');
logout.addEventListener('click', function (e) {
  if (!e.target.classList.contains('to-logout')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogOut"])().then(function () {
    appState.isLoggedIn = false;
    appState.error = '';
    appState.toLogout = false;
    renderPage();
  });
});
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  refreshData().then(function () {
    renderPage();
  });
})["catch"](function () {
  appState.isLoggedIn = false;
  refreshData().then(function () {
    renderPage();
  });
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchLogOut, fetchRecipes, fetchAddRecipe, fetchReturnPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogOut", function() { return fetchLogOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipes", function() { return fetchRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipe", function() { return fetchAddRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReturnPage", function() { return fetchReturnPage; });
//login button
var fetchLogIn = function fetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
}; //login status

var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        code: 'login-invalid'
      });
    }

    return;
  });
}; //logout button

var fetchLogOut = function fetchLogOut() {
  return fetch('/session', {
    method: 'DELETE'
  }).then(function (response) {
    if (response.ok) {
      return;
    }
  });
}; //Get recipes list

var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
}; //Add new recipe

var fetchAddRecipe = function fetchAddRecipe(title, ingredients, instruction) {
  return fetch('/recipes', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title.value,
      ingredients: ingredients.value,
      instruction: instruction.value
    }) //   body: JSON.stringify(),

  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
}; //Back to home page

var fetchReturnPage = function fetchReturnPage() {
  return fetch('/recipes', {
    method: 'GET'
  }).then(function (response) {
    if (response.ok) {
      return;
    }
  });
};

/***/ })

/******/ });
//# sourceMappingURL=recipe.js.map