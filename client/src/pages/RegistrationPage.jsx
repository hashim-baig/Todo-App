import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { ThemeContext } from "../context/ThemeContextProvider";

import './loginPage.css'

export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userMessage, setUserMessage] = useState('');

    const [userMessageClass, setUserMessageClass] = useState('');

    const { getThemeClass } = useContext(ThemeContext);

    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault();        
        if (password === confirmPassword) {
            try {
                const response = await api.post('/register', {
                    username: username,
                    password: password
                })
                setUserMessageClass('user-message-text');
                setUserMessage(response.data);
    
               setTimeout(() => navigate('/login'), 3000);
            } catch(err) {
                console.log(err.response.data);
                setUserMessageClass('user-message-error');
                setUserMessage(err.response?.data || 'An error occurred');
                setTimeout(() => setUserMessage(''), 2000);
            }
    
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setUserMessageClass('user-message-error')
            setUserMessage('Passwords do not match')
            setTimeout(() => setUserMessage(''), 5000);
            setPassword('');
            setConfirmPassword('')
        }
        
    }


    return (
        <div className={getThemeClass('card-container')}>
            <div className="user-message">
                <p>Create an account</p>
                <p className={userMessageClass}>{userMessage}</p>
            </div>
            <form className="form-container" onSubmit={handleRegistration}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    className={getThemeClass('form-input')}
                    onChange={(e) => {setUsername(e.target.value)}}
                    value={username}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    className={getThemeClass('form-input')}
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    className={getThemeClass('form-input')}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    value={confirmPassword}
                />

                <button className={getThemeClass('form-button')}>Create an account</button>
            </form>
            <p>Have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    )
}