import './TaskInfo.css';

export default function TaskInfo({onFilterChange, tasksCount}) {
    

    return (
        <li className='task-list-info'>
            <p className='task-list-info-item'>{tasksCount} items</p>
            <div className='task-list-filter'>
                <p className='task-list-info-item' onClick={()=> onFilterChange('All')}>All</p>
                <p className='task-list-info-item' onClick={()=> onFilterChange('Active')}>Active</p>
                <p className='task-list-info-item' onClick={()=> onFilterChange('Completed')}>Completed</p>
            </div>
            <p className='task-list-info-item'>Clear Completed</p>
        </li>
    );
}
