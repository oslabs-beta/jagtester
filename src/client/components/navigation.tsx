import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import TestProgrss from '../components/testConfigComponents/testProgress';
import { LinkContainer } from 'react-router-bootstrap';
import SvgComponent from '../img/logo';
import Asset from '../img/Asset.svg';
import cloud from '../img/cloud.svg';

const Navigation: () => JSX.Element = () => {
    return (
        <Container className="m-0 p-0 mb-5 sticky-top" fluid> 
            <Navbar variant="dark" className="mb-0 pb-0" style={{backgroundColor: "#3D405B"}}>
            <Navbar.Brand>
                    <img src={Asset} width={"50%"}/>
                </Navbar.Brand>
                <Nav className="ml">
                
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
        
    );
};

export default Navigation;
