import { useContext } from 'react'
import { createBrowserRouter, Link, RouterProvider, useNavigate } from 'react-router-dom';

import Layout from './pages/Layout.jsx';
import TodoPage from './pages/ToDoPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';

import './dark-theme.css';
import './light-theme.css';

import TaskContextProvider from './context/TaskContextProvider.jsx';
import { ThemeContext } from './context/ThemeContextProvider.jsx';
import { AuthContext } from './context/AuthContextProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <TodoPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegistrationPage />
      }
    ]
  }
])

function App() {
  const { getThemeClass } = useContext(ThemeContext);

  const { authState, logout } = useContext(AuthContext);


  const handleLogout = async () => {
    const response = await api.post('/logout')
    logout();
    
  };

  return (

    <main className={getThemeClass('main')}>

      <section className='main-container'>

        {authState.loggedIn &&
          <div className='user-profile'>
            <p>{authState.user.username}</p>
            <button className='logOut-btn' onClick={logout}>Log Out</button>
          </div>
        }
        <TaskContextProvider>
          <RouterProvider router={router} />
        </TaskContextProvider>
      </section>
    </main>

  );

}

export default App
