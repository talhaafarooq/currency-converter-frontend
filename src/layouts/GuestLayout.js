import React from 'react';

// import components
import GuestNavbar from '../components/GuestNavbar';

function GuestLayout(prop) {
    const Component = prop.component;
    return (
        <React.Fragment>
            <GuestNavbar />
            <Component />
        </React.Fragment>
    )
}

export default GuestLayout