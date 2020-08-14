import React, { useState } from 'react';
import { fetchLogIn } from './services';

export default function Footer({ onLogin }) {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");

    const performLogin = () => {
        if (!username) {
            setError("Please input username.");
            return;
        }
        setError('');
        setIsLoading(true);

        fetchLogIn(username)
            .then(() => onLogin(username))
            .catch((err) => {
                setError("Login failed, please try again.");
                setIsLoading(false);
            });
    };


    return (
        <div className="footer">
            <p className="error">{error}</p>
            {isLoading ? <span>Loading...</span> :
                <div className="login-form">
                    <h3>Sign in to explore</h3>
                    <input className="login-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className="login-input" placeholder="Password" />
                    <button className="login-input" onClick={performLogin}>Get started</button>
                </div>}
        </div>
    );
};
