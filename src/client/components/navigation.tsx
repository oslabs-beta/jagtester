import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/esm/Container';

const Navigation: () => JSX.Element = () => {
    return (
        <Container className="mb-4">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Jagtester</Navbar.Brand>
                <Nav className="mr-auto">
                    <LinkContainer exact to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer exact to="/test">
                        <Nav.Link>Test Page</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </Container>
    );
};

export default Navigation;
