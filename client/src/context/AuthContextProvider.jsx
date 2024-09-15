import { createContext, useState } from "react";


export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [authState, setAuthState] = useState({
        loggedIn: false,
        user: 'guest'
    })


    const login = (user) => {
        setAuthState(
            {
                loggedIn: true,
                user: user
            }
        )
    }

    const logout = () => {
        setAuthState(
            {
                loggedIn: false,
                user: 'guest'
            }
        )

    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}