import './Task.css';

export default function Task({taskClass, completed, checkbox, taskName, taskStatus}) {
    const completeClass = taskStatus === 'completed' ? `${completed}` : '';
    return (
        <li className={taskClass}><span className={checkbox}></span><p className={completeClass}>{taskName}</p></li>
     );
}