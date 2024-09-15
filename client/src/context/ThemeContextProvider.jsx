import { createContext, useState } from "react";


export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { }
})

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const themeState = {
        theme: theme,
        toggleTheme: () => {
            console.log(theme)
            setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
        }
    }

    return (
        <ThemeContext.Provider value={themeState}>
            {children}
        </ThemeContext.Provider>
    )
}