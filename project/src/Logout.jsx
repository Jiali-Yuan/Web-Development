import React from 'react';
import { fetchLogOut } from './services';

export default function Logout({ onLogout }) {

    const performLogout = () => {
        fetchLogOut()
            .then(() => onLogout());
    };
    return (
        <div className="logout">
            <span onClick={performLogout}>Logout</span>
        </div>
    );
};
