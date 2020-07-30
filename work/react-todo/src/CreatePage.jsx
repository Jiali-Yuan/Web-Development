import React, { useState } from 'react';
import { fetchAddNewTask } from './services';

export default function CreatePage({ setCreate, username, todoList}) {
    const [newTaskContent, setNewTaskContent] = useState("");
    const [newTaskName, setNewTaskName] = useState("");
    const [error, setError] = useState("");

    const addNewTask = () => {
        fetchAddNewTask(username, newTaskName, newTaskContent, false)
            .then((task) => {
                const inputTask = task.data;
                todoList.push(inputTask);
                setCreate(false);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const backButtonHandler = () => {
        setCreate(false);
    };

    return (
        <div className="create-page">
            <p>{error}</p>
            <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Enter task name..."></input>
            <br />
            <textarea value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} placeholder="Enter task details..."></textarea>
            <br />
            <button className="button" onClick={addNewTask}>ADD</button>
            <button className="button" onClick={backButtonHandler}>BACK</button>
        </div>
    );
}
