import React, { useState } from 'react';
import { fetchUpdateTask } from './services';

export default function UpdatePage({ setUpdate, username, clickedTaskId, clickedTaskName, clickedTaskContent, onUpdateSuccess }) {
    const [newTaskContent, setNewTaskContent] = useState(clickedTaskContent);
    const [newTaskName, setNewTaskName] = useState(clickedTaskName);

    const updateTask = (taskId) => {
        fetchUpdateTask(username, taskId, newTaskName, newTaskContent, false)
            .then((task) => {
                onUpdateSuccess(task.data);
            })
            .catch((err) => {
                //setError(err.message);
            });
    };

    const backButtonHandler = () => {
        setUpdate(false);
    }

    return (
        <div>
            <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}></input>
            <textarea value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)}></textarea>
            <button onClick={() => updateTask(clickedTaskId)}>Update</button>
            <button onClick={backButtonHandler}>BACK</button>
        </div>
    )
}
