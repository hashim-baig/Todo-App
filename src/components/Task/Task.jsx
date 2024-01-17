import './Task.css';
import { useState } from 'react';

export default function Task({taskClass, completed, checkbox, taskName, isComplete}) {
    const [taskStatus, setTaskStatus] = useState();
    const handleStatus= (status)=>{
        setTaskStatus(!status);
        console.log(taskStatus)
    }

    const completeClass = isComplete ? `${completed}` : '';
    return (
        <li className={taskClass}><span className={checkbox} onClick={()=>handleStatus(!isComplete)}></span><p className={completeClass}>{taskName}</p></li>
     );
}