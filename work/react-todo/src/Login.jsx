import React, { useState } from 'react';
import './App.css';
import {fetchLogIn} from './services';
import {errorMessages} from './todos'; 

const Login = ({ user, onLogin }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");

    const performLogin = () => {
        if (!username) {
            setError(errorMessages.USERNAME_INVALID);
            return;
        }
        setError('');
        setIsLoading(true);

        fetchLogIn(username)
            .then(() => onLogin(username))
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    };

    return (
        <div className="login">
            <p className="error">{error}</p>
            {isLoading ? <span>Loading...</span> :
                <div>
                    <p>Please Login</p>
                    <div className="input-username">
                        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? performLogin(e) : null} />
                        <button onClick={performLogin} >Login</button>
                    </div>
                </div>}
        </div>
    );
};

export default Login;
