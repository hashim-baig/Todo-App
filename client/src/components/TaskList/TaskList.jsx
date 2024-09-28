import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios.js';

import TaskInfo from '../TaskInfo/TaskInfo';

import './TaskList.css';

import { TaskContext } from '../../context/TaskContextProvider.jsx';
import { ThemeContext } from '../../context/ThemeContextProvider.jsx';

export default function TaskList() {

    const { tasks, fetchTasks } = useContext(TaskContext);
    const { getThemeClass } = useContext(ThemeContext);

    useEffect(() => {
        fetchTasks();
    }, [])

    const handleStatus = async (taskId, status) => {
        await api.post('/update-status', {
            taskId: taskId,
            status: status
        });
        fetchTasks();
    }

    const handleDeleteTask = async (taskId) => {
        await api.post('/delete-task', {
            taskId: taskId
        });
        fetchTasks();
    }

    return (
        <section className={getThemeClass('task-list')}>
            <ul>
                {tasks.map((task) =>
                    <li key={task.task_id} className={`${getThemeClass('task-name')}`}>
                        <div className='task-container'>
                            <span className={`${getThemeClass('check-box')} 
                        ${task.status === 'pending' ? '' : 'task-checked-container task-checked'}`}
                                onClick={() => handleStatus(task.task_id, task.status)}></span>
                            <p className={task.status === 'pending' ? '' : getThemeClass('completed')}>
                                {task.task_name}
                            </p>
                        </div>
                        <button className='delete-task' onClick={() => handleDeleteTask(task.task_id)}>X</button>
                    </li>
                )}
                <TaskInfo />
            </ul>

        </section>
    );
}