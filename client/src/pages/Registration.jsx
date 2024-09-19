import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault();        

        try {
            const response = await api.post('/register', {
                username: username,
                password: password
            })
            setMessage(response.data);

           setTimeout(() => navigate('/login'), 1500);
        } catch(err) {
            console.log(err.response.data);
            setMessage(err.response?.data || 'An error occurred');
        }

        setUsername('');
        setPassword('');
    }

    return (
        <section className="form-container">
            <p className="form-message">{message}</p>
            <form onSubmit={handleRegistration} className="form">
                <div className="form-input">
                    <label>Username</label>
                    <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} value={username}/>
                </div>

                <div className="form-input">
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
                </div>

                <button type="submit" className="form-btn">Sign Up</button>

            </form>
        </section>
    )
}