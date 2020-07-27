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

export const fetchLogIn = (username) => {
  return fetch('/session', {
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

export const fetchAllTasks = (username) => {
  return fetch(`/tasks/${username}`, {
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

export const fetchLogOut = () => {
  return fetch('/session', {
    method: 'DELETE'
  }).then((response) => {
    if (response.ok) {
      return;
    }
  });
};

export const fetchAddNewTask = (username, taskName, taskContent, isComplete) => {
  return fetch(`/tasks/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ task: { taskName : taskName, taskContent: taskContent, isComplete: isComplete } }),
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

export const fetchRemoveOneTask = (username, taskId) => {
  return fetch(`/tasks/${username}/${taskId}`, {
    method: 'DELETE',
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

export const fetchUpdateTask = (username, taskId, taskName, taskContent, isComplete) => {
  return fetch(`/tasks/${username}/${taskId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ task: { taskName : taskName, taskContent: taskContent, isComplete: isComplete } }),
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

export const fetchUpdateTheme = (username, theme) => {
  return fetch(`/theme/${username}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ theme : theme }),
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

