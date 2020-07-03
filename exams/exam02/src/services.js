//login button
export const fetchLogIn = (username) => {
    return fetch('/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( result => Promise.reject(result) );
      }
      return response.json();
    });
  };

  //login status
  export const fetchLoginStatus = () => {
    return fetch('/session', {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return Promise.reject({ code: 'login-invalid' });
      }
      return;
    });
  };

  //logout button
  export const fetchLogOut = () => {
    return fetch('/session', {
      method: 'DELETE'
    })
    .then( (response) => {
      if(response.ok) {
        return;
      }
    });
  };

  //Get recipes list
  export const fetchRecipes = () => {
    return fetch('/recipes', {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( result => Promise.reject(result) );
      }
      return response.json();
    });
  };

  //Add new recipe
  export const fetchAddRecipe = (title, ingredients, instruction) => {
    return fetch('/recipes', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({title: title.value, ingredients: ingredients.value, instruction: instruction.value}),
    //   body: JSON.stringify(),
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( result => Promise.reject(result) );
      }
      return response.json();
    });
  };

  //Back to home page
  export const fetchReturnPage = () => {
    return fetch('/recipes', {
      method: 'GET',
    })
    .then( (response) => {
      if(response.ok) {
        return;
      }
    });
  };
