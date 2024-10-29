import React, { createContext } from 'react';

const LocalStorageContext = createContext();

function LocalStorageProvider(props) {
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
        <LocalStorageContext.Provider value={{ setAuthToken, getAuthToken, removeAuthToken }}>
            {props.children}
        </LocalStorageContext.Provider>
    )
}

export { LocalStorageContext, LocalStorageProvider };