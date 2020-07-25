import React from 'react';
import { fetchLogOut } from './services';

const Logout = ({ onLogout }) => {
    const performLogout = () => {
        fetchLogOut()
            .then(() => onLogout());
    };
    return (
        <div className="logout">
            <button onClick={performLogout}>Logout</button>
        </div>
    );
}

export default Logout;
