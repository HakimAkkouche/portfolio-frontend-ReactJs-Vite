import React, { createContext, useContext, useState } from 'react';
import api from './api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const loginAction = async (data) => {
        try {

            const response = await api.post('/login', data);
            console.log('after');

            console.log('Login response:', response);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('isAuthenticated', true)
                setIsAuthenticated(true)
                setUser(response.data.user)
                setToken(response.data)
                localStorage.setItem('token', response.data)
            }

            throw new Error('Login failed. Please check your credentials.');
        } catch (err) {
            console.error('Error during login:', err.message || err);
        }
    };

    const logOut = () => {
        setUser(null)
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        setIsAuthenticated(false)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, loginAction, logOut }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
