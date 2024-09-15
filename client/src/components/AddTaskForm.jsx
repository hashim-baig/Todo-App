import { useState, useContext } from 'react';
import api from '../api/axios';

import '../styles/add-task-form.css'
import { ThemeContext } from '../context/ThemeContextProvider';
import { TaskContext } from '../context/TaskContextProvider';

export default function AddTaskForm() {
    const {theme} = useContext(ThemeContext);
    const [addTask, setAddTask] = useState("");

    const {fetchTasks} = useContext(TaskContext);
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/add-tasks", {
                task: addTask,
            }, {withCredentials: true});
            fetchTasks('/tasks');
            console.log('Fetch AddForm')
        } catch (err) {
            console.log(`Error Message: ${err}`);
        } finally {
            setAddTask("");
        }
    }

    return (
        <>
            <form onSubmit={handleAddTask} className={theme === 'dark' ? 'add-task-form add-task-form-dark' : 'add-task-form'}>
                <input
                    type="text"
                    name="add-task"
                    value={addTask}
                    onChange={(e) => { setAddTask(e.target.value)}}
                    className='input-task input-task-dark'
                />
                <button type="submit">Add</button>
            </form>
        </>
    )
}