import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState(''); // Add occupation state
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home if user is set
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/signup', {
                username,
                email,
                password,
                occupation, // Include occupation in the request
            });

            console.log('Response data:', response.data); // Log the response data

            // Set user data and redirect to home
            setUser(response.data);
            setSuccess('Signup successful!'); // Set success message
            setError('');
            // Clear input fields
            setUsername('');
            setPassword('');
            setEmail('');
            setOccupation(''); // Clear occupation field
            navigate('/'); // Redirect to home
        } catch (err) {
            console.error('Signup error:', err); // Log the error for debugging
            if (err.response) {
                // Server responded with a status other than 200 range
                setError('Signup failed: ' + (err.response.data?.message || 'Server error'));
            } else if (err.request) {
                // Request was made but no response received
                setError('Signup failed: No response from server');
            } else {
                // Something else happened while setting up the request
                setError('Signup failed: ' + err.message);
            }
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
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
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Occupation:</label> {/* Add occupation input field */}
                <input 
                    type="text" 
                    value={occupation} 
                    onChange={(e) => setOccupation(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;