import './TaskInfo.css';

export default function TaskInfo() {
    return (
        <li className='task-list-info'>
            <p className='task-list-info-item'>items left</p>
            <div className='task-list-filter'>
                <p className='task-list-info-item'>All</p>
                <p className='task-list-info-item'>Active</p>
                <p className='task-list-info-item'>Completed</p>
            </div>
            <p className='task-list-info-item'>Clear Completed</p>
        </li>
    );
}
