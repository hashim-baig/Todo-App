import { createContext, useState } from "react";
import api from "../api/axios";

export const TaskContext = createContext(
    {
        tasks: {},
        fetchTasks: () => { },
        filterTasks: () => { }
    }
)

export default function TaskContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const taskState = {
        tasks: tasks,
        fetchTasks: async (status) => {
            const response = await api.get('/tasks');
            const allTasks = response.data;
            if (status === 'active') {
                const activeTasks = allTasks.filter(task => task.status === 'pending')
                setTasks(activeTasks)
            } else if (status === 'completed') {
                const completedTasks = allTasks.filter(task => task.status === 'completed')
                setTasks(completedTasks)
            } else {
                setTasks(allTasks);
            }
        }
    }

    return (
        <TaskContext.Provider value={taskState}>
            {children}
        </TaskContext.Provider>
    )
}