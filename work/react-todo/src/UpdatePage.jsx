import React, { useState } from 'react';
import { fetchUpdateTask } from './services';

export default function UpdatePage({ setUpdate, username, clickedTaskId, clickedTaskName, clickedTaskContent, onUpdateSuccess }) {
    const [newTaskContent, setNewTaskContent] = useState(clickedTaskContent);
    const [newTaskName, setNewTaskName] = useState(clickedTaskName);

    const updateTask = (taskId) => {
        fetchUpdateTask(username, taskId, newTaskName, newTaskContent, false)
            .then((task) => {
                onUpdateSuccess(task.data);
            });
    };

    const backButtonHandler = () => {
        setUpdate(false);
    };

    return (
        <div className="update-page">
            <label>Task name: </label>
            <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}></input>
            <br />
            <label>Task details: </label>
            <textarea value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)}></textarea>
            <br />
            <button className="button" onClick={() => updateTask(clickedTaskId)}>Update</button>
            <button className="button" onClick={backButtonHandler}>Back</button>
        </div>
    );
}
