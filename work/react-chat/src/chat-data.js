const { v4: uuidv4 } = require('uuid');

const users = {
  "11": {
    username: "Jiali Yuan",
    active: true,
    uid: '11',
  }
};

const messages = [
  {
    sender: "Jiali Yuan",
    timestamp: date(),
    text: "Greetings from Jiali! ツ"
  }
];

const errorMessages = {
  DEFAULT: "Something went wrong, please try again",
  NETWORK_ERROR: "There was a problem reaching your network, please try again",
  USERNAME_INVALID: "Username is invalid",
  MESSAGE_INVALID: "Message is invalid",
  LOGIN_REQUIRED: "You must be logged in to view this content",
  LOGIN_UNAUTHORIZED: "You are not permitted to view this content",
};

//Format timestamp
function date() {
  const currentTime = new Date();
  const formattedTime = currentTime.getFullYear() + " " +
    ("0" + (currentTime.getMonth() + 1)).slice(-2) + "." +
    ("0" + currentTime.getDate()).slice(-2) + " " +
    ("0" + currentTime.getHours()).slice(-2) + ":" +
    ("0" + currentTime.getMinutes()).slice(-2) + ":" +
    ("0" + currentTime.getSeconds()).slice(-2);
  return formattedTime;
}

function addMessage({ username, text, timestamp = date() }) {
  const message = { sender: username, timestamp, text };
  messages.push(message);
  return message;
}

function userExists(username) {
  const record = Object.values(users).find(user => user.username === username);
  return record && record.uid;
}

function addUser(username) {
  const oldId = userExists(username);
  const id = oldId || uuidv4();
  users[id] = { username, active: true, uid: id };
  return id;
}

function removeUser(uid) {
  if (users[uid]) {
    users[uid].active = false;
  }
}

const chat = {
  users,
  messages,
  errorMessages,
  addMessage,
  addUser,
  removeUser,
};

module.exports = chat;
