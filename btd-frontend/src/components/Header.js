import React from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';

export default function Header(props){
    return(
        <nav className = "navbar navbar-dark bg-dark">
            <a className = "navbar-brand">Modern Diagnostic</a>
            <NavLink className = "nav-link" to = '/'>Home</NavLink>
            <NavLink className = "nav-link" to = '/results'>Past Results</NavLink>
        </nav>
    )
}