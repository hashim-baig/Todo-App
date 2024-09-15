import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContextProvider"


export default function TodoHeader() {
    const {toggleTheme} = useContext(ThemeContext)
    return (
        <>
            <h2>TODO</h2>
            <button onClick={toggleTheme}>Theme</button>
        </>
    )
}