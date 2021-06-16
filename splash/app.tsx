import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-reveal/Fade';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import favicon from './img/favicon3.svg';
import logotext from './img/logotext.svg';
import github from './img/github.svg'
import npm from './img/npm.svg'
import linkedin from './img/linkedin.svg'

import Features from './components/Features';


const App: () => JSX.Element = () => {
    const initialColor = [90, 90, 180];
    const [bgColor, setBgColor] = useState<string>(`rgb(${initialColor.join(', ')})`);
    const styles = {
        root: {
            backgroundColor: bgColor,
            minHeight: '100vh',
        },
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    const shadedColor = (
        index: number,
        totalCount: number,
        color1 = initialColor,
        color2 = [255, 175, 145]
    ) => {
        const finalColor = [];
        for (let i = 0; i < 3; i++) {
            const color = color1[i] + (index * (color2[i] - color1[i])) / totalCount;
            finalColor.push(Math.floor(color));
        }
        return `rgba(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]}, 1)`;
        // return '#' + Math.floor(Math.random() * 16777215).toString(16)
    };

    const handleScroll = () => {
        const scrollHeightLimit = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        setBgColor(shadedColor(window.scrollY, scrollHeightLimit));
        // styles.root.backgroundColor = shadedColor(window.scrollY, scrollHeightLimit);
        // console.log(event.srcElement.body.scrollTop!);
    };
    return (
        <Container fluid id="root" style={styles.root}>
            <Navbar variant="dark" sticky="top" id="navbar">
                <Nav className="mr-auto ml-5 h6" >
                    <Nav.Link href ="#">
                        <img src={favicon} width={"auto"} height={"50px"}/>
                    </Nav.Link>
                    <Nav.Link className="mt-3" href ="/">
                        About
                    </Nav.Link>
                    <Nav.Link className="mt-3" href="#features">
                        Features
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto mr-5">
                    <Nav.Link href="https://github.com/oslabs-beta/jagtester">
                        <img src={github} height={"40px"} width={"auto"}/>
                    </Nav.Link>
                    <Nav.Link href="https://www.npmjs.com/package/jagtester">
                        <img src={npm} height={"40px"} width={"auto"}/>
                    </Nav.Link>
                    <Nav.Link href="https://www.linkedin.com/company/jagtester">
                        <img src={linkedin} height={"40px"} width={"auto"}/>
                    </Nav.Link>
                </Nav>
            </Navbar>
            <div data-spy="scroll" data-target="#navbar" data-offset="0">
            <Row className="justify-content-center">
                <Col sm={6}>
                <div id="splash" style={{"margin": "200px 0 200px 0"}}>
                    <Row className="align-items-center">
                        <Col>
                            <Fade left>
                                <img
                                    src={favicon}
                                    height={'auto'}
                                    width={'75%'}
                                    className="float-right"
                                />
                            </Fade>
                        </Col>
                        <Col>
                            <Fade right>
                                <img
                                    src={logotext}
                                    height={'auto'}
                                    width={'75%'}
                                    className="float-left"
                                />
                            </Fade>
                        </Col>
                    </Row>
                        <Fade up>
                            <Row className="text-center h1" style={{color: "white"}}>
                                <Col>
                                     An Express Server Middleware Tool
                                </Col>
                            </Row>
                        </Fade>
                    </div>
                    <div id={'features'}>
                        <Features />
                    </div>
                    <p>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                        consequat velit a urna tempor eleifend. Vestibulum eros mi, dignissim vitae
                        facilisis sit amet, sodales id nibh. Donec eget metus sed lacus faucibus
                        facilisis vel sed ante. Mauris in ultrices neque. Cras enim sapien, dictum
                        ornare condimentum in, consequat in arcu. Mauris sit amet elit mauris. Morbi
                        ornare euismod gravida. Duis molestie commodo posuere. Quisque odio tellus,
                        tempor a tristique at, scelerisque ut risus. Pellentesque orci lorem,
                        hendrerit dictum sagittis tincidunt, dignissim ut nibh. Etiam quis metu`.repeat(
                            10
                        )}
                    </p>
                </Col>
            </Row>
            </div>
        </Container>
    );
};

export default App;
