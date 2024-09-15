import { Outlet, Link } from "react-router-dom"

import '../styles/nav-links.css'
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

import api from "../api/axios"

export default function Layout() {
    const { authState, logout } = useContext(AuthContext)

    const handleLogout = async () => {
        const response = await api.post('/logout', { withCredentials: true })
        console.log(response.data);
        logout()
    }

    return (
        <>
            <nav className="nav-links">
                {!authState.loggedIn &&
                    <>
                        <Link to='/login' className="nav-link-item">Login</Link>
                        <Link to='/register' className="nav-link-item">Register</Link>
                    </>
                }

                {/* <Link to='/tasks' className="nav-link-item">Tasks</Link> */}

                {authState.loggedIn &&
                    <>
                        <Link to='/login' className="nav-link-item" onClick={handleLogout}>Log Out</Link>
                    </>
                }
            </nav >
            <Outlet />
        </>
    )
}