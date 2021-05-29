import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: () => JSX.Element = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/test">
                        Test Page
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
