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

export const fetchLogOut = () => {
    return fetch('/logout', {
        method: 'POST'
    }).then((response) => {
        if (response.ok) {
            return;
        }
    });
};

export const fetchParks = () => {
    return fetch('/parks', {
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

export const fetchOnePark = (parkId) => {
    return fetch(`/parks/${parkId}`, {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'network-error' });
        })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject({ code: 'error' });
            }
            return response.json();
        });
};

export const fetchAddPark = (parkName, introduction, location) => {
    return fetch('/park', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ parkName : parkName, introduction : introduction, location : location }),
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

  export const fetchAddComment = (text, parkId) => {
    return fetch(`/comment/${parkId}`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ text: text}),
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

  export const fetchPhoto = (parkId) => {
    return fetch(`/photo/${parkId}`, {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'network-error' });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response;
        });
};

export const fetchAddPhoto = (parkId, imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    return fetch(`/photo/${parkId}`, {
      method: 'POST',
      body: formData,
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