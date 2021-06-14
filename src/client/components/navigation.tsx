import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import TestProgrss from '../components/testConfigComponents/testProgress';
import { LinkContainer } from 'react-router-bootstrap';
import Asset from '../img/Asset.svg';

import DarkSwitch from './darkModeSwitch';

const Navigation: () => JSX.Element = () => {
    return (
        <Container className="m-0 p-0 mb-5 sticky-top" fluid>
            <Navbar variant="dark" className="mb-0 pb-0" style={{ backgroundColor: '#3D405B' }}>
                <img
                    src={Asset}
                    width={'10%'}
                    className="d-inline-flex align-top"
                    style={{
                        marginBottom: 1,
                    }}
                />
                <Nav className="ml-4 h5">
                    <LinkContainer exact to="/">
                        <Nav.Link>Test</Nav.Link>
                    </LinkContainer>
                    <LinkContainer exact to="/results">
                        <Nav.Link>Results</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className="ml-auto">
                    <DarkSwitch />
                </Nav>
            </Navbar>
            <TestProgrss />
        </Container>
    );
};

export default Navigation;
