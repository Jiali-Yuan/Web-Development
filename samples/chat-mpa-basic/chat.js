const users = {
    1: "Amit",
    2: "Bao",
};

const messages = [
  {
    sender: "1",
    timestamp: new Date("2019-01-01 19:20:00"),
    text: "You up?",
  },
  {
    sender: "2",
    timestamp: new Date("2019-01-01 19:21:00"),
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, timestamp, text }) {
  messages.push({ sender, timestamp, text });
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

