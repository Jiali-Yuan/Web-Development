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

/***/ "./src/recipe-web.js":
/*!***************************!*\
  !*** ./src/recipe-web.js ***!
  \***************************/
/*! exports provided: appState, clearAddPage, clearList, clearDetailsPage, renderDetailsPage, renderAddPage, renderErrors, renderList, renderLogin, renderLogout, renderNewRecipeButton, renderPage, renderReturnButton, renderHead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appState", function() { return appState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAddPage", function() { return clearAddPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearList", function() { return clearList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearDetailsPage", function() { return clearDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderDetailsPage", function() { return renderDetailsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAddPage", function() { return renderAddPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderErrors", function() { return renderErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderList", function() { return renderList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderLogin", function() { return renderLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderLogout", function() { return renderLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNewRecipeButton", function() { return renderNewRecipeButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderPage", function() { return renderPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderReturnButton", function() { return renderReturnButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHead", function() { return renderHead; });
var appState = {
  isLoggedIn: false,
  addRecipe: false,
  error: '',
  clientRecipeList: {}
};

function renderHead(show) {
  var headline = document.querySelector('.headline');

  if (show) {
    headline.innerHTML = "\n        <h1>My Recipes</h1>\n     ";
  } else {
    headline.innerHTML = '';
  }
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
    addPage.innerHTML = "\n        <div class=\"title\">\n        <label>Title: <input class=\"add-title\" value=\"\"/></label>\n        </div>\n        <div class=\"ingredients\">\n        <label>Ingredients: </label><textarea class=\"add-ingredients\" value=\"\"></textarea>\n        </div>\n        <div class=\"instruction\">\n        <label>Instruction: </label><textarea class=\"add-instruction\" value=\"\"></textarea>\n        </div>\n        <button class=\"add-new-recipe\" type=\"button\">Add New Recipe</button>\n        ";
  } else {
    addPage.innerHTML = '';
  }
}

function renderDetailsPage(list) {
  var listRecipe = document.querySelector('.details-page');
  listRecipe.innerHTML = "\n    <span class=\"detail-header\">".concat(list.title, "'s details</span>\n    <div class=\"detail-title\">\n       <span class=\"note\">Title: </span>\n       <span>").concat(list.title, "</span>\n    </div>\n    <div class=\"detail-author\">\n       <span class=\"note\">Author: </span>\n       <span>").concat(list.author, "</span>\n    </div>\n    <div class=\"detail-ingredients\">\n       <span class=\"note\">Ingredients: </span>\n       <span>").concat(list.ingredients, "</span>\n    </div>\n    <div class=\"detail-instruction\">\n       <span class=\"note\">Instruction: </span>\n       <span>").concat(list.instruction, "</span>\n    </div>\n    ");
}

function clearDetailsPage() {
  var listRecipe = document.querySelector('.details-page');
  listRecipe.innerHTML = '';
}



/***/ }),

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipe-web.js */ "./src/recipe-web.js");



function refreshData() {
  return Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (list) {
    for (var key in list) {
      _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].clientRecipeList[key] = list[key];
    }
  });
}

var detailButton = document.querySelector('.recipes-list');
detailButton.addEventListener('click', function (e) {
  e.preventDefault();
  var id = e.target.dataset.id;

  if (id === undefined) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (list) {
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearList"])();
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderHead"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderLogout"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderNewRecipeButton"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderLogin"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderDetailsPage"])(list[id]);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(true);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderErrors"])('');
  });
});
var newRecipeButton = document.querySelector('.new-recipe');
newRecipeButton.addEventListener('click', function (e) {
  if (!e.target.classList.contains('new-recipe-button')) {
    return;
  }

  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearList"])();
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderLogout"])(false);
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderAddPage"])(true);
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(true);
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderNewRecipeButton"])(false);
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderHead"])(false);
  Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearDetailsPage"])();
});
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
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].clientRecipeList[id] = {
      id: id,
      title: title.value,
      author: author,
      ingredients: ingredients.value,
      instruction: instruction.value
    };
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = '';
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderDetailsPage"])(list);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderAddPage"])(false);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(true);
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderErrors"])('');
  })["catch"](function () {
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = 'All fields required';
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderErrors"])(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error);
  });
});
var returnButton = document.querySelector('.return-button');
returnButton.addEventListener('click', function (e) {
  if (!e.target.classList.contains('return')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchReturnPage"])().then(function () {
    if (_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].isLoggedIn) {
      _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = '';
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(false);
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearAddPage"])();
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearDetailsPage"])();
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
    } else {
      _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = '';
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderReturnButton"])(false);
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearDetailsPage"])();
      Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
    }
  });
});
var login = document.querySelector('.login');
login.addEventListener('click', function (e) {
  if (!e.target.classList.contains('to-login')) {
    return;
  }

  var username = login.querySelector('input').value;
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function (list) {
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].isLoggedIn = true;
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = '';
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].clientRecipeList = list;
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["clearDetailsPage"])();
  })["catch"](function () {
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = 'Login failed, try again';
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
  });
});
var logout = document.querySelector('.logout');
logout.addEventListener('click', function (e) {
  if (!e.target.classList.contains('to-logout')) {
    return;
  }

  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogOut"])().then(function () {
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].isLoggedIn = false;
    _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].error = '';
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderHead"])(true);
  });
});
Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].isLoggedIn = true;
  refreshData().then(function () {
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
  });
})["catch"](function () {
  _recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["appState"].isLoggedIn = false;
  refreshData().then(function () {
    Object(_recipe_web_js__WEBPACK_IMPORTED_MODULE_1__["renderPage"])();
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
};
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
};
var fetchLogOut = function fetchLogOut() {
  return fetch('/session', {
    method: 'DELETE'
  }).then(function (response) {
    if (response.ok) {
      return;
    }
  });
};
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
};
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
};
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