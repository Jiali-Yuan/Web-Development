import React, { useState, useEffect } from 'react';
import { fetchAllTasks, fetchUpdateTask, fetchRemoveOneTask, fetchUpdateTheme } from './services';
import CreatePage from './CreatePage';
import UpdatePage from './UpdatePage';
import DetailPage from './DetailPage';
import Filter from './Filter';
import Sort from './Sort';
import Theme from './Theme';

export default function TodoPanel({ user }) {
    const [todoList, setTodoList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [create, setCreate] = useState(false);
    const [view, setView] = useState(false);
    const username = user.username;
    const [clickedTaskId, setClickedTaskId] = useState("");
    const [clickedTaskName, setClickedTaskName] = useState("");
    const [clickedTaskContent, setClickedTaskContent] = useState("");
    const [theme, setTheme] = useState("Default");

    useEffect(() => {
        fetchAllTasks(user.username)
            .then(tasks => {
                setTodoList(Object.values(tasks.data));
            })
    }, []);

    const updateTheme = (clickedTheme) => {
        fetchUpdateTheme(user.username, clickedTheme)
            .then(() => {
                setTheme(clickedTheme);
            })
    };

    const themeStyle = {
        backgroundColor: theme === "Dark" ? "#333" :
            theme === "Light" ? "#ccc" : theme === "Colorful" ? "red" : ""
    };

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

    const onFilter = (filter) => {
        if (filter === "undo") {
            const filteredTask = [];
            for (let task of todoList) {
                if (!task.isComplete) {
                    filteredTask.push(task);
                }
            }
            setTodoList(filteredTask);
        } else {
            fetchAllTasks(user.username)
                .then(tasks => {
                    setTodoList(Object.values(tasks.data));
                })
        }
    };

    const onSort = (sort) => {
        const sortedList = [];
        const undoList = [];
        const doneList = [];
        for (let task of todoList) {
            sortedList.push(task);
        }
        for (let task of todoList) {
            if (!task.isComplete) {
                undoList.push(task);
            } else {
                doneList.push(task);
            }
        }
        if (sort === "up") {
            sortedList.sort((a, b) => a.taskName.localeCompare(b.taskName));
            setTodoList(sortedList);
        } else if (sort === "down") {
            sortedList.sort((b, a) => a.taskName.localeCompare(b.taskName));
            setTodoList(sortedList);
        } else if (sort === "byUndo") {
            setTodoList(undoList.concat(doneList));
        } else if (sort === "byDone") {
            setTodoList(doneList.concat(undoList));
        } else {
            fetchAllTasks(user.username)
                .then(tasks => {
                    setTodoList(Object.values(tasks.data));
                })
        }
    };

    //Done button.
    const [isActive, setIsActive] = useState(true);
    const completeTodo = (todo) => {
        fetchUpdateTask(username, todo.taskId, todo.taskName, todo.taskContent, isActive)
            .then((task) => {
                onUpdateSuccess(task.data);
                setIsActive(!isActive);
            })
    };

    //Refresh button.
    const onRefresh = () => {
        const currentList = [];
        for (let task of todoList) {
            currentList.push(task);
        }
        setTodoList(currentList);
    };

    const showTaskList = todoList.map((todo) => (
        <li className="task-content" key={todo.taskId}>
            <span className={todo.isComplete ? "complete" : ""}>{todo.taskName}</span>
            <span className="done" onClick={() => completeTodo(todo)}>{todo.isComplete ? "Undo" : "Mark as done"}</span>
            <span className="view" onClick={() => viewButtonHandler(todo.taskName, todo.taskContent)}>View</span>
            <span className="edit" onClick={() => editButtonHandler(todo.taskName, todo.taskContent, todo.taskId)}>Edit</span>
            <span className="remove" onClick={() => removeOneTask(todo.taskId)}>Remove</span>
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
                            clickedTaskContent={clickedTaskContent} />
                    </div> :
                    <div className="todo-panel" style={themeStyle}>
                        <h1>Task List</h1>
                        <div className="title-bar">
                            <Theme updateTheme={updateTheme} />
                            <Filter onFilter={onFilter} />
                            <Sort onSort={onSort} />
                            <button className="refresh-bar" onClick={onRefresh}>Refresh</button>
                        </div>
                        {showTaskList}
                        <button className="create" onClick={createButtonHandler}>CREATE</button>
                    </div>))}
        </div>
    );
};
