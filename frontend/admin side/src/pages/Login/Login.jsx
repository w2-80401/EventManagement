import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.server}/user/signin`, { email, password });
            const { token, firstName, lastName, role, userId, phone } = response.data.data;
            console.log(response.data);
          
            localStorage.setItem('token', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('role', role);
            localStorage.setItem('UserId', userId)
            localStorage.setItem('phone', phone)
            if (role === 'ADMIN') {
                sessionStorage.setItem('isLoggedIn', true);
                console.log('User is now logged in as ADMIN');
                window.location.href = '/';
            } else {
                console.log('User is not authorized as ADMIN');
                alert('You are not admin so go to hell')
            }
           
        } catch (error) {
            // Display error message in toast
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className='product'>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
                <Grid item xs={10} sm={6} md={4} lg={3}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Username"
                                fullWidth
                                margin="normal"
                                name="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                fullWidth
                                margin="normal"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
