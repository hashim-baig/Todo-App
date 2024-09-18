import { createContext, useState } from "react";
import api from '../api/axios';


export const TaskContext = createContext({
    tasks: {},
    itemsLength: 0,
    fetchTasks: () => { }
})


export default function TaskContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [itemsLength, setItemsLength] = useState(0);

    const taskState = {
        tasks: tasks,
        itemsLength: itemsLength,
        fetchTasks: async (route, btn) => {
            try {
                const response = await api.get(route, {withCredentials: true});
                const tasks = response.data;
                const activeTasks = tasks.filter(task => task.status === 'pending');
                if (btn === 'active') {
                    setTasks(activeTasks);
                } else if (btn === 'completed') {
                    const completedTasks = tasks.filter(task => task.status === 'completed');
                    setTasks(completedTasks);
                } else {
                    setTasks(tasks);
                }
                setItemsLength(activeTasks.length);
            } catch (err) {
                console.log(err.response.data);
            }
        }
    }


    return (
        <TaskContext.Provider value={taskState}>
            {children}
        </TaskContext.Provider>
    );
}