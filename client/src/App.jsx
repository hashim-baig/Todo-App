import { useContext, useState } from 'react';
import { ThemeContext } from './context/ThemeContextProvider';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Todo from './pages/todo';
import Login from './pages/Login';

import './App.css';
import Registration from './pages/Registration';
import Layout from './components/Layout';
import AuthContextProvider from './context/AuthContextProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Registration />} /> 
      <Route path='tasks' element={<Todo />} />
    </Route>


  )
)

function App() {
  const { theme } = useContext(ThemeContext)

  return (
    
      <AuthContextProvider>
        <div className={theme === 'dark' ? 'App dark-app' : 'App'}>
        <RouterProvider router={router}/>
        </div>
      </AuthContextProvider>
  );
}

export default App;
