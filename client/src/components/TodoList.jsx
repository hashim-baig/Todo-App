import {  useEffect, useContext } from 'react';
import api from '../api/axios';
import TodoFilter from './TodoFilter';

import '../styles/todo-list.css'
import { TaskContext } from '../context/TaskContextProvider';

export default function TodoList() {

    const {tasks, fetchTasks} = useContext(TaskContext)

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = () => {
            try {
                console.log('useEffect TodoList')
                fetchTasks('/tasks', signal);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    console.log('An Error Occured', err)
                }
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }

    },[]);


    const handleTaskStatus = async (task) => {
        try {
            console.log(task)
            await api.post("/update-status", {
                taskId: task.task_id,
                status: task.status
            }, {withCredentials: true})
            fetchTasks('/tasks');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <ul className='todo-list'>
                {
                    tasks.map((task, index) => (
                        <li key={index} className='todo-list-item'>
                            <p className={task.status === 'completed' ? 'todo-list-item-completed' : ''}>{task.task_name}</p>
                            <button onClick={() => handleTaskStatus(task)}>{task.status === "pending" ? "Complete" : "Pending"}</button>
                        </li>
                    )
                    )}
                <TodoFilter />
            </ul>
        </>
    )
}