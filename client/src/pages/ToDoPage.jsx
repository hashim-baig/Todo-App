import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { Navigate } from 'react-router-dom';

import AddTask from '../components/AddTask/AddTask.jsx'
import TaskList from '../components/TaskList/TaskList.jsx';

export default function ToDoPage() {
    const { authState } = useContext(AuthContext);

    if (!authState.loggedIn) {
        return <Navigate to='/login' />
    }
    
    return (
        <>
            <AddTask />
            <TaskList />
        </>
    )
}