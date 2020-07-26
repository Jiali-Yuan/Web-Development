export const fetchLogIn = (username) => {
  return fetch('/login', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => {
      return Promise.reject({ code: 'network-error' });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
    });
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
    .catch(() => {
      return Promise.reject({ code: 'network-error' });
    })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject({ code: 'login-invalid' });
      }
      return response.json();
    });
};


export const fetchAddNewMessage = (text) => {
  return fetch('/addMessage', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ text: text }),
  })
    .catch(() => {
      return Promise.reject({ code: 'network-error' });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
    });
};

export const fetchActiveUsers = () => {
  return fetch('/activeUsers', {
    method: 'GET',
  })
    .catch(() => {
      return Promise.reject({ code: 'network-error' });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
    });
}

export const fetchMessages = () => {
  return fetch('/messages', {
    method: 'GET',
  })
    .catch(() => {
      return Promise.reject({ code: 'network-error' });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
    });
};

export const fetchLogOut = () => {
  return fetch('/logout', {
    method: 'POST'
  }).then((response) => {
    if (response.ok) {
      return;
    }
  });
};
