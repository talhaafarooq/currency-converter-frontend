import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { LocalStorageContext } from '../context/LocalStorageContext';

function AuthenticatedLayout(prop) {
    const Component = prop.component;
    const { getAuthToken } = useContext(LocalStorageContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken(); // get the auth token
        if (!token) {
            // If token does not exist, redirect to login page
            navigate('/login'); 
        }
    }, [getAuthToken, navigate]);

    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
            <Component />
        </React.Fragment>
    );
}

export default AuthenticatedLayout;
