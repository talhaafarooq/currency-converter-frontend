import React, { createContext } from 'react';

const LocalStorageContext = createContext();

function LocalStorageProvider(props) {
    const setAuthToken = (token, value) => {
        localStorage.setItem(token, value);
    }
    const getAuthToken = (token) => {
        return localStorage.getItem(token);
    }

    const removeAuthToken = (token) => {
        localStorage.removeItem(token);
    }

    return (
        <LocalStorageContext.Provider value={{ setAuthToken, getAuthToken, removeAuthToken }}>
            {props.children}
        </LocalStorageContext.Provider>
    )
}

export { LocalStorageContext, LocalStorageProvider };