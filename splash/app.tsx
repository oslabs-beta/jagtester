import React, { useEffect, useState } from 'react';

//React bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Fade from 'react-reveal/Fade';

//images
import favicon from './img/favicon3.svg';
import favicon2 from './img/favicon5.svg';
import logotext from './img/logotext.svg';
import github from './img/github.svg';
import npm from './img/npm.svg';
import install from './img/install.png';
import linkedin from './img/linkedin.svg';
import singleroute from './img/singleroute.gif';
import exportdelete from './img/exportdelete.gif';
import team1 from './img/team1.jpg';
import team2 from './img/team2.jpg';
import team3 from './img/team3.jpg';
import twitter from './img/twitter.svg';

// mui imports
import GetAppIcon from '@material-ui/icons/GetApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const SocialIconWithLink: (props: { link: string; src: string }) => JSX.Element = ({
    link,
    src,
}) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <img className="social-team" src={src} height={'40px'} width={'auto'} />
        </a>
    );
};

const GetStartedSingle: (props: { text: string; imgSrc: string }) => JSX.Element = ({
    text,
    imgSrc,
}) => {
    return (
        <Col sm={8} md={8} lg={7} className="mx-auto mb-3 mt-4">
            <h4>{text}</h4>
            <img src={imgSrc} width="100%" style={{ paddingBottom: '15px' }} />
        </Col>
    );
};

const Person: (props: {
    name: string;
    portrait: string;
    githubLink: string;
    twitterLink: string;
    linkedinLink: string;
}) => JSX.Element = ({ name, portrait, githubLink, twitterLink, linkedinLink }) => {
    const styles = {
        team: {
            display: 'inline',
            margin: '0 auto',
            height: 'auto',
            width: '100%',
        },
    };
    return (
        <Col sm={8} md={8} lg={4}>
            <div className="image-cropper mb-3">
                <img src={portrait} style={styles.team} />
            </div>
            <h4>{name}</h4>
            <SocialIconWithLink link={githubLink} src={github} />
            <SocialIconWithLink link={linkedinLink} src={linkedin} />
            <SocialIconWithLink link={twitterLink} src={twitter} />
        </Col>
    );
};

const App: () => JSX.Element = () => {
    const initialColor = [90, 90, 180];
    const [bgColor, setBgColor] = useState<string>(`rgb(${initialColor.join(', ')})`);
    const styles = {
        root: {
            backgroundColor: bgColor,
            minHeight: '100vh',
            'overflow-y': 'auto',
            fontFamily: 'Helvetica',
            paddingBottom: '10vh',
        },
        footer: {
            backgroundColor: bgColor,
            fontFamily: 'Helvetica',
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
        <Container fluid className="m-0 p-0">
            <Container fluid id="root" className={'d-flex'} style={styles.root}>
                <Navbar
                    collapseOnSelect
                    expand="md"
                    variant="dark"
                    fixed="top"
                    id="navbar"
                    className="align-middle px-5"
                >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand>
                            <Nav.Link href="#home">
                                <img src={favicon2} width={'auto'} height={'50px'} />
                            </Nav.Link>
                        </Navbar.Brand>
                        <Nav className="mr-auto h6 align-items-center">
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#getstarted">Get Started</Nav.Link>
                            <Nav.Link href="#team">Meet the Team</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto align-items-center">
                            <Nav.Link
                                href="https://github.com/oslabs-beta/jagtester"
                                target="_blank"
                            >
                                <img src={github} height={'40px'} width={'auto'} />
                            </Nav.Link>
                            <Nav.Link
                                href="https://www.npmjs.com/package/jagtester"
                                target="_blank"
                            >
                                <img src={npm} height={'40px'} width={'auto'} />
                            </Nav.Link>
                            <Nav.Link
                                href="https://www.linkedin.com/company/jagtester"
                                target="_blank"
                            >
                                <img src={linkedin} height={'40px'} width={'auto'} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Row id="home" className="justify-content-center align-items-center">
                    <Col sm={12} lg={8} className=" my-5 py-5">
                        <Col className=" my-5 py-5">
                            <Row className="align-items-center my-5 py-5">
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
                                <Row className="text-center h1">
                                    <Col>
                                        <h1>An Express Server Middleware Load Tool</h1>
                                    </Col>
                                </Row>
                            </Fade>
                        </Col>
                    </Col>
                    <Col id="about" sm={12} lg={8} className=" my-5 py-5">
                        <Col className=" my-5 py-5">
                            <Col className="text-center mt-5 pt-5">
                                <h1>What is Jagtester?</h1>
                            </Col>

                            <Col className="text-center mb-1">
                                <h4>
                                    Jagtester is a load testing tool that simulates life-like
                                    traffic on your server, monitoring response time at every
                                    middleware. Not sure where there&apos;s a bottleneck? We&apos;ve
                                    got you covered.
                                </h4>
                            </Col>
                            <Row className="justify-content-center text-center">
                                <Col sm={4} xl={3} className="mx-auto mb-5">
                                    <h1>
                                        <CallSplitIcon fontSize="large" />
                                    </h1>
                                    <h4>Split Load Tests</h4>
                                    <p className="lead mb-0">
                                        Multiple routes can be tested simultaneously.
                                    </p>
                                </Col>
                                <Col sm={4} xl={3} className="mx-auto mb-5 ">
                                    <h1>
                                        <GetAppIcon fontSize="large" />
                                    </h1>
                                    <h4>Export Data</h4>
                                    <p className="lead mb-0">
                                        Easily download/export data in a readable JSON format.
                                    </p>
                                </Col>
                                <Col sm={4} xl={3} className="mx-auto mb-5">
                                    <h1>
                                        <BarChartIcon fontSize="large" />
                                    </h1>
                                    <h4>Visualize Data</h4>
                                    <p className="lead mb-0">View results on graphs and tables.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col id="getstarted" sm={12} lg={8} className="my-5 py-5 ">
                        <Col className=" my-5 py-5 ">
                            <Col className=" mt-5 pt-5">
                                <Col className="text-center">
                                    <h1>Get Started</h1>
                                </Col>
                                <Row className="justify-content-center pb-5 mb-5 mt-2 text-center">
                                    <GetStartedSingle
                                        imgSrc={install}
                                        text="1. Install and Start Server"
                                    />
                                    <GetStartedSingle
                                        imgSrc={singleroute}
                                        text="2. Test Routes and View Data"
                                    />
                                    <GetStartedSingle
                                        imgSrc={exportdelete}
                                        text="3. Export or Delete Results"
                                    />
                                </Row>
                            </Col>
                        </Col>
                    </Col>
                    <Col id="team" sm={12} lg={8} className="mt-5 pt-5">
                        <Col className="my-5 py-5">
                            {/* Use team images that are at least 500px x 500px */}
                            <Col className="text-center">
                                <h1>Meet the Team</h1>
                            </Col>

                            <Row className="justify-content-center text-center">
                                <Person
                                    name={'Abigail Dorso'}
                                    portrait={team3}
                                    githubLink="https://github.com/abbydorso/"
                                    linkedinLink="https://www.linkedin.com/in/abigaildorso/"
                                    twitterLink="https://twitter.com/abbydorso/"
                                />

                                <Person
                                    name={'Grigor Minasyan'}
                                    portrait={team1}
                                    githubLink="https://github.com/grigor-minasyan/"
                                    linkedinLink="https://www.linkedin.com/in/grigor-minasyan/"
                                    twitterLink="https://twitter.com/grigorminas/"
                                />
                                <Person
                                    name={'Jason Charles de Vera'}
                                    portrait={team2}
                                    githubLink={'https://github.com/jcdevera'}
                                    linkedinLink={
                                        'https://www.linkedin.com/in/jason-charles-de-vera/'
                                    }
                                    twitterLink={'https://twitter.com/jachrode/'}
                                />
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="text-center" style={styles.footer}>
                <Row className="py-5">
                    <Col>
                        <footer>Jagtester is Open Source and licensed under ISC.</footer>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default App;
