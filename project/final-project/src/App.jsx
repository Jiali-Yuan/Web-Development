import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Logout from './Logout';
import { fetchLoginStatus } from './services';
import ParksList from './ParksList';
import Welcome from './Welcome';

function App() {

  const [userState, setUserState] = useState({ isLoggedIn: false, username: "" });
  const [explore, setExplore] = useState(false);

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

  const onExplore = () => {
    setExplore(true);
  };

  const backButtonHandler = () => {
    setExplore(false);
  };

  return (
    <div className="App">
      {explore ? <ParksList onBack={backButtonHandler}
        user={userState} /> : userState.isLoggedIn ?
          <div className="home-page">
            <Header />
            <Body onExplore={onExplore} />
            <Logout onLogout={logout} />
            <Welcome />
          </div> :
          <div className="home-page">
            <Header />
            <Body onExplore={onExplore} />
            <Footer user={userState} onLogin={login} />
          </div>}
    </div>
  );
};

export default App;
