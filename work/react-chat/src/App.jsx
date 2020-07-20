import React, { useState, useEffect } from 'react';
import Login from './Login';
import { fetchLoginStatus } from './services';
import MessagePanel from './MessagePanel';
import UserBar from './UserBar';
import Logout from './Logout';
import './App.css';

export default function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, username: "" });
  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setUserState({
          isLoggedIn: true,
          username: userInfo.username,
        });
      });
  }, []);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username: username,
    });
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false,
      username: "",
    });
  };

  return (
    <div>{userState.isLoggedIn ?
      <div className="chat-app">
        <div className="display-panel">
          <UserBar username={userState.username} />
          <MessagePanel />
        </div>
        <div className="logout-panel">
          <Logout onLogout={logout} />
        </div>
      </div> :
      <Login user={userState} onLogin={login} />}
    </div>
  );
};



