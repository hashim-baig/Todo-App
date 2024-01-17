import { useState } from 'react';

import TaskInfo from '../TaskInfo/TaskInfo';
import Task from '../Task/Task.jsx';

import './TaskList.css';

import { TASKSDATA } from '../../data.js';

export default function TaskList({ taskList, changeTheme }) {
    const [tasks, setTasks] = useState(TASKSDATA);
    const [filter, setFilter] = useState('All');

    const handleTasks = (taskState) => {
        switch (taskState) {
            case 'Active':
                return TASKSDATA.filter((taskItem)=> taskItem.isComplete === false);
                break;
            case 'Completed':
                return TASKSDATA.filter((taskItem)=> taskItem.isComplete === true);
                break;
            default:
                return TASKSDATA;
        }      
    }

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        console.log(newFilter);
        setTasks(handleTasks(newFilter));
    }



    const taskProps = {
        taskClass: changeTheme('task-name'),
        checkbox: changeTheme('check-box'),
        completed: changeTheme('completed')
      };

    return (
        <section className={taskList}>
            <ul>
                {tasks.map((taskInfo) =>
                    <Task key={taskInfo.taskName} {...taskProps} {...taskInfo} />)}

                <TaskInfo
                    onFilterChange={handleFilter}
                    tasksCount={tasks.length}
                />
            </ul>

        </section>
    );
}