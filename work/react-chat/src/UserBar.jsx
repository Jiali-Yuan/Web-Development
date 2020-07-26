import React, { useState, useEffect } from 'react';
import { fetchActiveUsers } from './services';

export default function UserBar({ username }) {
    const [userList, setUserList] = useState("");

    useEffect(() => {
        fetchActiveUsers()
            .then(users => {
                setUserList(users);
            })
    }, []);

    const usernames = Object.values(userList).map(user => (
        <li className="user-name" key={user.uid}>
            {user.username}
        </li>
    ));
    return (
        <div className="user-panel">
            <div className="welcome">Hello {username} ツ</div>
            <div className="user-title">
                <span>Active people</span>
            </div>
            {usernames}
        </div>
    );
};


