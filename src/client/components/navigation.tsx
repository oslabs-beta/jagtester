import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { LinkContainer } from 'react-router-bootstrap';

const Navigation: () => JSX.Element = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Navbar.Brand>Jagtester</Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer exact to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to="/test">
                    <Nav.Link>Test Page</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to="/results">
                    <Nav.Link>Results</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
