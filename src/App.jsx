import { useState } from 'react'

import Heading from './components/Heading/Heading.jsx'
import AddTask from './components/AddTask/AddTask.jsx'
import TaskList from './components/TaskList/TaskList.jsx';




import iconSun from './assets/icon-sun.svg';
import iconMoon from './assets/icon-moon.svg';

import './dark-theme.css';
import './light-theme.css';

function App() {
  const [theme, setTheme] = useState(iconSun);



  const isDarktheme = theme === iconSun;

  const handleTheme = () => {
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

        <TaskList taskList={getThemeClass('task-list')} changeTheme={getThemeClass} />

      </section>
    </main>
  );

}

export default App
