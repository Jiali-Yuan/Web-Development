import React, { useState, useEffect } from 'react';
import { fetchMessages, fetchAddNewMessage } from './services';

const MessagePanel = () => {
    const [error, setError] = useState("");
    const [messageList, setMessageList] = useState("");
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetchMessages()
            .then(messages => {
                setMessageList(messages);
            })
    }, []);

    const addNewMessage = () => {
        fetchAddNewMessage(newMessage)
            .then((message) => {
                let messages = [...messageList];
                messages.push(message);
                setMessageList(messages);
                setNewMessage("");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const messages = [...messageList];
    const showMessageList = messages.map((m) =>
        <li key={m.timestamp}>
            <span className="chat-person">{m.sender}</span>
            <span className="chat-time">{m.timestamp}</span>
            <br></br>
            <p className="chat-message">{m.text}</p>
        </li>
    );

    return (
        <div className="out-going">
            <div className="message-panel">
                <p className="error">{error}</p>
                {showMessageList}
            </div>
            <div>
                <input value={newMessage} className="to-send" placeholder="Type the message"
                    onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={addNewMessage}>Send</button>
            </div>
        </div>
    );
}

export default MessagePanel;