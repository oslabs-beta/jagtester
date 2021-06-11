import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import TestProgrss from '../components/testConfigComponents/testProgress';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation: () => JSX.Element = () => {
    return (
<<<<<<< HEAD
        <Navbar bg="dark" variant="dark" className="mb-4" sticky="top">
            <Navbar.Brand>Jagtester</Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer exact to="/">
                    <Nav.Link>Test</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to="/results">
                    <Nav.Link>Results</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
=======
        <Container className="m-0 p-0 mb-5 sticky-top" fluid> 
            <Navbar bg="dark" variant="dark" className="mb-0">
                <Navbar.Brand>Jagtester</Navbar.Brand>
                <Nav className="mr-auto">
                    <LinkContainer exact to="/">
                        <Nav.Link>Test</Nav.Link>
                    </LinkContainer>
                    <LinkContainer exact to="/results">
                        <Nav.Link>Results</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
            <TestProgrss/>
        </Container>
>>>>>>> dev
    );
};

export default Navigation;
