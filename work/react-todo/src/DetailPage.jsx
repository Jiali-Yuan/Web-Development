import React from 'react';

export default function DetailPage({ setView, clickedTaskName, clickedTaskContent }) {
    const backButtonHandler = () => {
        setView(false);
    }; 
    
    return (
        <div className="detail-page">
            <div className="task-name">
                <h3>Task Name: </h3><span>{clickedTaskName}</span>
            </div>
            <div className="task-details">
                <h3>Task Details: </h3><p>{clickedTaskContent}</p>
            </div>
            <button className="button" onClick={backButtonHandler}>Back</button>
        </div>
    );
};
