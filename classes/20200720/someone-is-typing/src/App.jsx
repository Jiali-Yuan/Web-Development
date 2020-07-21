import React, { useState, useEffect} from 'react';
import './App.css';


// Assumes all calls work, which is terrible idea
const getMessages = () => {
  return fetch('/messages')
  .then( response => {
    return response.json();
  });
};

const sendMessage = ({ username, message }) => {
  return fetch('/messages', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ username, message }),
  })
  .then( response => response.json());
};

const getActive = () => {
  return fetch('/typing')
  .then( response => response.json());
};

const setActive = (username) => {
  return fetch('/typing', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify( { username } ),
  })
  .then( response => response.json() );
};


function App() {
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [username, setUsername] = useState('default');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(''); // probably poor name
  const [storedTimeout, setStoredTimeout] = useState(null); // definitely poor name

  const updateMessages = (newMessages) => {
    setOldMessages(messages);
    setMessages(newMessages);

    clearTimeout(storedTimeout); // if any
    setStoredTimeout( setTimeout( () => { // save the id this returns, so you can cancel it if we get new messages
      setOldMessages(newMessages);
    }, 10000) );
  };

  useEffect( () => {
    getMessages().then( messages => {
      setOldMessages(messages);
      setMessages(messages);
    });
    setInterval( () => {
      getActive()
      .then( users => {
        if(users.length)  {
          setStatus(`users are typing: ${ users.join(',') }`);
        } else {
          setStatus('');
        }
      })
    }, 1000);
  }, []);

  const onType = (e) => {
    setActive(username);
    setText(e.target.value);
  };

  const changeUser = (e) => {
    setUsername(e.target.value);
  };

  const sendChat = () => { // poor, unclear naming
    sendMessage({ username, message: text })
    .then( messages => updateMessages(messages) );
    setText('');
  };


    const messageList = messages.map( (message, index) => {
      // if messages isn't in oldMessages, add className
      console.log({ message, index, length: oldMessages.length });
      const flag = index > oldMessages.length-1 ? 'new-message' : '';
      return <li key={message + index} className={flag}>{message.username}: {message.message}</li>;
    });

  return (
    <div className="App">
      Username: <input onChange={changeUser}/>
      <ul>
        {messageList}
      </ul>
      {status}
      <input onChange={onType} value={text}/><button onClick={sendChat}>Send</button>
    </div>
  );
}

export default App;
