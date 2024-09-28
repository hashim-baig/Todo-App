import { useContext } from 'react';
import './Heading.css';
import { ThemeContext } from '../../context/ThemeContextProvider';

import iconSun from '../../assets/icon-sun.svg';
import iconMoon from '../../assets/icon-moon.svg';

export default function Heading() {
  const {theme, toggleTheme} = useContext(ThemeContext)

  const currentIcon = theme === 'dark' ? iconSun : iconMoon;
  return (
    <section className='heading'>
      <p>TODO</p>
      <button className='theme-btn' onClick={() => toggleTheme()}><img src={currentIcon} alt="Theme Icon" /></button>
    </section>
  );
}