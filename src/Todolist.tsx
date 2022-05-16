import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from "./Todolist.module.css"
import {Checkbox} from "./components/Checkbox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, isDone: boolean)=>void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let[error,setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")

    const addTask = () => {
        if(title.trim()!==''){
            props.addTask(title.trim());
        setTitle("");
        } else{
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const changeIsDoneHandler = (tID: string,isDone: boolean)=> {
        props.changeIsDone(tID, isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} className={error ? s.error : ''}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>)=> {
                    //     props.changeIsDone(t.id, event.currentTarget.checked)
                    // }

                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        {/*<input type="checkbox" checked={t.isDone}*/}
                        {/*       onChange={(event)=>changeIsDoneHandler(t.id, event)}/>*/}
                        <Checkbox isDone={t.isDone}
                                  callBack={(isDone)=>changeIsDoneHandler(t.id,isDone )}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter==='all' ? s.activeFilter : ''}
                    onClick={ onAllClickHandler }>All</button>
            <button className={props.filter==='active' ? s.activeFilter : ''}
                    onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter==='completed' ? s.activeFilter : ''}
                    onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
