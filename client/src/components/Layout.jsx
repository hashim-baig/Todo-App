import { Outlet, Link, NavLink } from "react-router-dom"

import '../styles/nav-links.css'
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

import api from "../api/axios"

export default function Layout() {
    const { authState, logout } = useContext(AuthContext)

    const handleLogout = async () => {
        const response = await api.post('/logout', { withCredentials: true })
        logout()
    }

    return (
        <>
            <nav className="nav-links">
                {!authState.loggedIn &&
                    <>
                        <NavLink to='/login' className={({isActive}) => (isActive ? "nav-link-item nav-link-item-active" : "nav-link-item")}>Login</NavLink>
                        <NavLink to='/register' className={({isActive}) => (isActive ? "nav-link-item nav-link-item-active" : "nav-link-item")}>Register</NavLink>
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