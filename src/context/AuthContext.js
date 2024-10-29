import React, { createContext } from 'react';

const AuthContext = createContext();

function AuthProvider(props) {
    const setAuthToken = (value) => {
        localStorage.setItem('authToken', value);
    }
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    }

    const removeAuthToken = () => {
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ setAuthToken, getAuthToken, removeAuthToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };