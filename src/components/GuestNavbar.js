import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/GuestNavbar.css';

function GuestNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">CurrencyExchangerApp</NavLink>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                        >
                            Currency Converter
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default GuestNavbar