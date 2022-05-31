import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const taskClasses = t.isDone ? "is-done" : "" ;
            return (
                <li key={t.id}>
                    <input
                        onChange={changeStatus}
                        type="checkbox"
                        checked={t.isDone}/>
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }
    const addTask = () => {

    }
    const allBtnClasses = props.filter === "all" ? "active-filter" : ""
    const activeBtnClasses = props.filter === "active" ? "active-filter" : ""
    const completedBtnClasses = props.filter === "completed" ? "active-filter" : ""

    return (
        <div>
            <h3>{props.title}
                <button onClick={()=>props.removeTodoList(props.todoListID)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        style={errorInputStyle}*/}
            {/*        value={title}*/}
            {/*        onChange={onChangeSetTitle}*/}
            {/*        onKeyDown={onKeyDownAddTask}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}*/}
            {/*</div>*/}
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={allBtnClasses}
                    onClick={changeFilter("all")}>All</button>
                <button
                    className={activeBtnClasses}
                    onClick={changeFilter("active")}>Active</button>
                <button
                    className={completedBtnClasses}
                    onClick={changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;