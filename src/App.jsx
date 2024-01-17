import { useState } from 'react'
import Heading from './components/Heading/Heading.jsx'
import AddTask from './components/AddTask/AddTask.jsx'
import TaskList from './components/TaskList/TaskList.jsx';
import Task from './components/Task/Task.jsx';
import iconSun from './assets/icon-sun.svg';
import iconMoon from './assets/icon-moon.svg';

import './dark-theme.css';
import './light-theme.css';


function App() {
  const [theme, setTheme] = useState(iconSun);

  const isDarktheme = theme === iconSun;

  function handleTheme() {
    setTheme(isDarktheme ? iconMoon : iconSun);
  }

  const getThemeClass = (baseClass) => isDarktheme ? `${baseClass} ${baseClass}-dark` : `${baseClass} ${baseClass}-light`;

  return (
    <main className={theme === iconSun ? 'main-dark' : 'main-light'}>
      <section className='main-container'>
        <section className='task-input'>
          <Heading
            theme={theme}
            handleTheme={handleTheme}
          />
          <AddTask
            addTaskInput={getThemeClass('add-task-input')}
            checkbox={getThemeClass('check-box')}
          />
        </section>

        <TaskList
          taskList={getThemeClass('task-list')}
        >
          <Task
            taskClass={getThemeClass('task-name')}
            checkbox={getThemeClass('check-box')}
            completed={getThemeClass('completed')}
            taskName='Task Complete'
            taskStatus='completed' />
          <Task
            taskClass={getThemeClass('task-name')}
            checkbox={getThemeClass('check-box')}
            completed={getThemeClass('completed')}
            taskName='Task incomplete'
            taskStatus='incomplete'
          />
        </TaskList>
      </section>
    </main>
  );

}

export default App
