import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContextProvider';
import api from '../../api/axios';
import './TaskInfo.css';


export default function TaskInfo() {
    const {tasks, fetchTasks, filterTasks} = useContext(TaskContext);

    const handleClearCompleted = async () => {
        await api.get('/clear-completed');
        fetchTasks();
    }

    return (
        <li className='task-list-info'>
            <p className='task-list-info-item'>{tasks.length} items</p>
            <div className='task-list-filter'>
                <p className='task-list-info-item' onClick={()=> fetchTasks()}>All</p>
                <p className='task-list-info-item' onClick={() => fetchTasks('active')}>Active</p>
                <p className='task-list-info-item' onClick={() => fetchTasks('completed')}>Completed</p>
            </div>
            <p className='task-list-info-item' onClick={() => handleClearCompleted()}>Clear Completed</p>
        </li>
    );
}
