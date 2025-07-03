import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useKudos } from "../context/KudosContext";
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { fetchRemaining } = useKudos();
    
     useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/users');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/auth/login/', {
                email,
                password
            });
            if (response.data.status) {
                localStorage.setItem('access_token', response.data.data.access_token);
                localStorage.setItem('refresh', response.data.data.refresh);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                fetchRemaining();
                navigate('/users');
            } else {
                setError(response.data.message || "Login failed.");
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
