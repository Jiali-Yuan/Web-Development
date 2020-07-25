import React from 'react';

export default function DetailPage({ setView, clickedTaskName, clickedTaskContent }) {
    const backButtonHandler = () => {
        setView(false);
    }
    return (
        <div>
            <span>{clickedTaskName}</span>
            <p>{clickedTaskContent}</p>
            <button onClick={backButtonHandler}>BACK</button>
        </div>
    );
};
