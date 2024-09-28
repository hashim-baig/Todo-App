import { useState, useContext } from 'react';

import './AddTask.css';

import api from '../../api/axios.js';

import { ThemeContext } from '../../context/ThemeContextProvider.jsx';
import { TaskContext } from '../../context/TaskContextProvider.jsx';


export default function AddTask() {
  const [addTask, setAddTask] = useState("");

  const {getThemeClass} = useContext(ThemeContext);
  const {fetchTasks} = useContext(TaskContext)

  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log('Add Form');
    try {
      await api.post("/add-tasks", {
        task: addTask
      })
      fetchTasks();
    } catch (err) {
      console.log(err)
    } finally {
      setAddTask('');      
    }
  }

  return (
    <form onSubmit={handleAddTask} className={getThemeClass('add-task-input')}>
      {/* <input className='add-task-input-checkbox' type='checkbox' />
      <span className={getThemeClass('check-box')}></span> */}
      <input
        className='add-task-input-text'
        name='add-task'
        type="text"
        value={addTask}
        onChange={(e) => { setAddTask(e.target.value)}}
        placeholder='Create a new todo...'
      />
    </form>
  );
}