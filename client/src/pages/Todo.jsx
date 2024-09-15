import TodoHeader from '../components/TodoHeader';
import AddTaskForm from '../components/AddTaskForm';
import TodoList from '../components/TodoList';
import TaskContextProvider from '../context/TaskContextProvider';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import {Navigate} from 'react-router-dom'

export default function Todo() {

    const {authState} = useContext(AuthContext);

    if(!authState.loggedIn) {
        return <Navigate to='/login'/>
    }
    
    return (
        <TaskContextProvider>
            <TodoHeader />
            <AddTaskForm />
            <TodoList />
        </TaskContextProvider>
    )
}