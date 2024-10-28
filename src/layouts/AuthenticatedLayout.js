import React from 'react';
// import components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function AuthenticatedLayout(prop) {
    const Component = prop.component;
    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
            <Component />
        </React.Fragment>
    )
}

export default AuthenticatedLayout;