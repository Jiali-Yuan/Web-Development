import React, { useState, useEffect } from 'react';
import { fetchAllTasks, fetchOneTask } from './services';
import { fetchUpdateTask, fetchRemoveOneTask, fetchUpdateTheme } from './services';
import CreatePage from './CreatePage';
import UpdatePage from './UpdatePage';
import DetailPage from './DetailPage';

export default function TodoPanel({ user }) {
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(false);
    const [create, setCreate] = useState(false);
    const [view, setView] = useState(false);
    const username = user.username;
    const [clickedTaskId, setClickedTaskId] = useState("");
    const [clickedTaskName, setClickedTaskName] = useState("");
    const [clickedTaskContent, setClickedTaskContent] = useState("");
    const [theme, setTheme] = useState(user.theme);
    // const [task, setTask] = useState({taskId: "", taskName: "", taskContent: ""});

    useEffect(() => {
        fetchAllTasks(user.username)
            .then(tasks => {
                setTodoList(Object.values(tasks.data));
            })
    }, []);

    const updateTheme = () => {
        fetchUpdateTheme(user.username, theme)
            .then(theme => {
                setTheme(theme.data);
            })
    };
    console.log("theme: " + theme);

    //Remove button.
    const removeOneTask = (index) => {
        fetchRemoveOneTask(user.username, index)
            .then((task) => {
                setTodoList(todoList.filter((todo) => todo.taskId !== task.data.taskId));
            })
    };

    //Edit button.
    const editButtonHandler = (taskName, taskContent, taskId) => {
        setUpdate(true);
        setClickedTaskId(taskId);
        setClickedTaskName(taskName);
        setClickedTaskContent(taskContent);
    }

    //Create button.
    const createButtonHandler = () => {
        setCreate(true);
    };

    //View button.
    const viewButtonHandler = (taskName, taskContent) => {
        setView(true);
        setClickedTaskName(taskName);
        setClickedTaskContent(taskContent);
    }

    const onUpdateSuccess = (task) => {
        const newTodos = [];
        for (let t of todoList) {
            if (t.taskId === task.taskId) {
                newTodos.push(task);
            } else {
                newTodos.push(t);
            }
        }
        setTodoList(newTodos);
        setUpdate(false);
    };

    //Done button.
    const completeTodo = (todo) => {
        fetchUpdateTask(username, todo.taskId, todo.taskName, todo.taskContent, true)
            .then((task) => {
                onUpdateSuccess(task.data);
            })
    };

    const showTaskList = todoList.map((todo) => (
        <li className="task-content" key={todo.taskId}>
            <span className={todo.isComplete ? "complete" : ""}>{todo.taskName}</span>
            <button onClick={() => completeTodo(todo)}>Done</button>
            <button onClick={() => viewButtonHandler(todo.taskName, todo.taskContent)}>View</button>
            <button onClick={() => editButtonHandler(todo.taskName, todo.taskContent, todo.taskId)}>EDIT</button>
            <button onClick={() => removeOneTask(todo.taskId)}>Remove</button>
        </li>
    ));

    return (
        <div> {create ?
            <div>
                <CreatePage setCreate={setCreate}
                    username={username}
                    todoList={todoList} />
            </div> : (update ?
                <div><UpdatePage
                    setUpdate={setUpdate}
                    username={username}
                    clickedTaskId={clickedTaskId}
                    clickedTaskName={clickedTaskName}
                    clickedTaskContent={clickedTaskContent}
                    onUpdateSuccess={onUpdateSuccess} />
                </div> : (view ?
                    <div>
                        <DetailPage setView={setView}
                        clickedTaskName={clickedTaskName}
                        clickedTaskContent={clickedTaskContent}/>
                    </div> :
                    <div>
                        <h1>Task List</h1>
                        <label>Theme: </label>
                        <select>
                            <option>Default</option>
                            <option value="0">Dark</option>
                            <option value="1">Light</option>
                            <option value="2">Colorful</option>
                        </select>
                        {showTaskList}
                        <button onClick={createButtonHandler}>CREATE</button>
                    </div>))}
        </div>
    )
}
