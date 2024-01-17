import './TaskList.css';

import TaskInfo from '../TaskInfo/TaskInfo';

export default function TaskList({ children, taskList }) {
    return (
        <section className={taskList}>
            <ul>
                {children}
                <TaskInfo/>
            </ul>

        </section>
    );
}