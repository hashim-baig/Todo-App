import { useContext } from 'react';
import '../styles/todo-list-filter.css'
import { TaskContext } from '../context/TaskContextProvider';

export default function TodoFilter() {

    const {itemsLength, fetchTasks} = useContext(TaskContext);

    const handleAll = () => {
        fetchTasks('/tasks');
    }

    const handleFilter = (btn) => {
        fetchTasks('/tasks', btn);
    }

    const handleClearCompleted = () => {
        fetchTasks('/clear-completed');
    }
    
    return (
        <li>
            <ul className="todo-list-filter">
                <li>{itemsLength} item left</li>
                <li>
                    <ul className='filter-btn'>
                        <li><button onClick={handleAll}>All</button></li>
                        <li><button onClick={() => handleFilter('active')}>Active</button></li>
                        <li><button onClick={() => handleFilter('completed')}>Completed</button></li>
                    </ul>
                </li>
                <li><button onClick={handleClearCompleted}>Clear Completed</button></li>
            </ul>
        </li>
    )
}