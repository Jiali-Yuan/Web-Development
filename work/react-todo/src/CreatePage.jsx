import React, { useState } from 'react';
import { fetchAddNewTask } from './services';

export default function CreatePage({ setCreate, username, todoList}) {
    const [newTaskContent, setNewTaskContent] = useState("");
    const [newTaskName, setNewTaskName] = useState("");
    //const [isComplete, setIsComplete] = useState(false);

    const addNewTask = () => {
        fetchAddNewTask(username, newTaskName, newTaskContent, false)
            .then((task) => {
                const inputTask = task.data;
                todoList.push(inputTask);
                //setTodoList(todoList);
                setCreate(false);
            })
            .catch((err) => {
                //setError(err.message);
            });
    };

    const backButtonHandler = () => {
        setCreate(false);
    }
    return (
        <div>
            <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Enter task name..."></input>
            <textarea value={newTaskContent} onChange={(e) => setNewTaskContent(e.target.value)} placeholder="Enter task details..."></textarea>
            <button onClick={addNewTask}>ADD</button>
            <button onClick={backButtonHandler}>BACK</button>
        </div>
    )
}
