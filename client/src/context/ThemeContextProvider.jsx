import { createContext, useState } from 'react';

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
    getThemeClass: () => {}
})

export default function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState('dark');

    const themeState = {
        theme: theme,
        toggleTheme: () => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark');
        },
        getThemeClass: (baseClass) => theme === 'dark' ? `${baseClass} ${baseClass}-dark` : `${baseClass} ${baseClass}-light`

    }

    return (
        <ThemeContext.Provider value={themeState}>
            {children}
        </ThemeContext.Provider>
    )
}