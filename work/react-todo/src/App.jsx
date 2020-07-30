import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import { fetchLoginStatus, fetchTheme } from './services';
import TodoPanel from './TodoPanel';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, username: "", theme: ""});
  useEffect(() => {
    fetchLoginStatus()
      .then(sessionInfo => {
        setUserState({
          isLoggedIn: true,
          username: sessionInfo.data.username,
          theme: sessionInfo.data.theme,
        });
      });
  }, []);
  console.log("theme after login: " + userState.theme)
  console.log("username: " + userState.username);

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
    <div> {userState.isLoggedIn ?
      <div>
        <div><TodoPanel user={userState}/></div>
        <div><Logout onLogout={logout} /></div>
      </div> :
      <Login className="login" user={userState} onLogin={login} />}
    </div>
  );
}

export default App;
