import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { setUser } = useUser(); // Access the context
    const navigate = useNavigate(); // Initialize useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {
                username,
                password,
            });
            setUser(response.data); // Set user data in context
            setSuccess('Login successful!');
            setError('');
            console.log('Login successful:', response.data);
            navigate('/'); // Redirect to home after successful login
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;