import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from "../context/ThemeContextProvider";

import './loginPage.css'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userMessage, setUserMessage] = useState('Please enter your details to login');

    const [userMessageClass, setUserMessageClass] = useState('');

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const { getThemeClass } = useContext(ThemeContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                username: username,
                password: password
            });
            const { user } = response.data;
            setUserMessageClass('user-message-text');
            setUserMessage(`${user.username}`);
            login(user);
            setTimeout(() => navigate('/'), 2000);
            setUsername('');
        } catch (err) {
            setUserMessageClass('user-message-error')
            setTimeout(() => setUserMessageClass(''), 3000);
            setUserMessage(err.response?.data || "Log in failed");
            setTimeout(() => setUserMessage('Please enter your details to login'), 3000);
            console.log(err);
        } finally {
            setPassword('');
        }

    }


    return (
        <div className={getThemeClass('card-container')}>
            <div className="user-message">
                <p>Welcome back</p>
                <p className={userMessageClass}>{userMessage}</p>
            </div>
            <form className="form-container" onSubmit={handleLogin}>
                <label>Username</label>
                <input
                    type="text"
                    className={getThemeClass('form-input')}
                    onChange={(e) => { setUsername(e.target.value) }}
                    value={username}
                />

                <label htmlFor="">Password</label>
                <input
                    type="password"
                    className={getThemeClass('form-input')}
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                />

                <button className={getThemeClass('form-button')}>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}