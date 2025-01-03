import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthProvider';
import {
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  TextField
} from '@mui/material';

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {loginAction} = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError('');

    try {
      await loginAction(input)
      navigate('/dashboard')
    } catch (error) {
      // Extraire un message d'erreur clair
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login. Please try again. : ' + error);
      }
    }
  }

  const handleInput = (e) => {
    const {name, value} = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Card sx={{ maxWidth: 900, margin: '30px auto', border: '3px solid #356' }}>
      <CardHeader>
        Login
      </CardHeader>
      <CardContent>
          <Container maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h5" component="h1" align="center">
              Login
            </Typography>

            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}

            <TextField
              label="Username"
              name='username'
              variant="outlined"
              fullWidth
              onChange={handleInput}
              required
            />

            <TextField
              label="Password"
              name='password'
              variant="outlined"
              type="password"
              fullWidth
              onChange={handleInput}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
          </Container>
      </CardContent>
      <CardActions>
        <Link to="/" size="small" color="primary">
          Retour
        </Link>
      </CardActions>
    </Card>
  );
};

export default Login;
