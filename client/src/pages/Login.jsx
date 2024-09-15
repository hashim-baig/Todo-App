import { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from 'react-router-dom';

import '../styles/forms.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                username: username,
                password: password
            }, { withCredentials: true })
            const { user } = response.data;
            setMessage(`Welcome ${user.username}!!!`)
            login(user);
            setTimeout(() => navigate('/tasks'), 1500);
        } catch (err) {
            setMessage(err.response?.data || "Log in failed")
            console.log(err);
        }

        setUsername('');
        setPassword('');
    }

    return (
        <section className="form-container">
            <p className="form-message">{message}</p>
            <form onSubmit={handleLogin} className="form">
                <div className="form-input">
                    <label>Username</label>
                    <input type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                </div>

                <div className="form-input">
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>

                <button type="submit" className="form-btn">Login</button>

            </form>
        </section>
    )
}