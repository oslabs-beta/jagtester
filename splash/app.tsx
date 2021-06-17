import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-reveal/Fade';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import favicon from './img/favicon3.svg';
import favicon2 from './img/favicon5.svg';
import logotext from './img/logotext.svg';
import github from './img/github.svg';
import npm from './img/npm.svg';
import install from './img/install.png';
import linkedin from './img/linkedin.svg';
import ScrollspyNav from 'react-scrollspy-nav';
import GetAppIcon from '@material-ui/icons/GetApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import singleroute from './img/singleroute.gif';
import exportdelete from './img/exportdelete.gif';
import team1 from './img/team1.png';
import team2 from './img/team2.png';
import team3 from './img/team3.png';
import twitter from './img/twitter.svg';

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
        splash: {
            padding: '30vh 0 25vh 0',
            height: '75vh',
        },
        content1: {
            padding: '30vh 0 30vh 0',
            height: '75vh',
        },
        content2: {
            padding: '30vh 0 30vh 0',
            marginBottom: '10vh',
            height: '100vh',
        },
        team: {
            display: 'inline',
            margin: '0 auto',
            height: 'auto',
            width: '100%',
        },
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    const shadedColor = (index: number, totalCount: number, color1 = initialColor, color2 = [255, 175, 145]) => {
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
        <>
            <Container fluid id="root" style={styles.root}>
                <Navbar variant="dark" fixed="top" id="navbar">
                    <ScrollspyNav scrollTargetIds={['home', 'about', 'features', 'team']} activeNavClass="active" scrollDuration="500">
                        <Nav className="mr-auto ml-5 h6">
                            <Nav.Link href="#home">
                                <img src={favicon2} width={'auto'} height={'50px'} />
                            </Nav.Link>
                            <Nav.Link className="mt-3" href="#about">
                                About
                            </Nav.Link>
                            <Nav.Link className="mt-3" href="#features">
                                Get Started
                            </Nav.Link>
                            <Nav.Link className="mt-3" href="#team">
                                Meet the Team
                            </Nav.Link>
                        </Nav>
                    </ScrollspyNav>
                    <Nav className="ml-auto mr-5">
                        <Nav.Link href="https://github.com/oslabs-beta/jagtester" target="_blank">
                            <img src={github} height={'40px'} width={'auto'} />
                        </Nav.Link>
                        <Nav.Link href="https://www.npmjs.com/package/jagtester" target="_blank">
                            <img src={npm} height={'40px'} width={'auto'} />
                        </Nav.Link>
                        <Nav.Link href="https://www.linkedin.com/company/jagtester" target="_blank">
                            <img src={linkedin} height={'40px'} width={'auto'} />
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <div id="home" style={styles.splash}>
                            <Row className="align-items-center">
                                <Col>
                                    <Fade left>
                                        <img src={favicon} height={'auto'} width={'75%'} className="float-right" />
                                    </Fade>
                                </Col>
                                <Col>
                                    <Fade right>
                                        <img src={logotext} height={'auto'} width={'75%'} className="float-left" />
                                    </Fade>
                                </Col>
                            </Row>
                            <Fade up>
                                <Row className="text-center h1" style={{ color: 'white', marginTop: '20px' }}>
                                    <Col>
                                        <h1>An Express Server Middleware Load Tool</h1>
                                    </Col>
                                </Row>
                            </Fade>
                        </div>
                        <div id="about" style={styles.content1}>
                            <Row>
                                <Col className="text-center" style={{ color: 'white' }}>
                                    <h1>What is Jagtester?</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center" style={{ color: 'white' }}>
                                    <h4>
                                        Jagtester is load testing tool that simulates life-like traffic on your server, monitoring response
                                        time at every middleware. Not sure where theres a bottleneck? We&apos;ve got you covered.
                                    </h4>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Container fluid className="text-white text-center">
                                <div className="row justify-content-center">
                                    <Col sm={4} xl={3}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <h1>
                                                <CallSplitIcon fontSize="large" />
                                            </h1>
                                            <h5>Split Load Tests</h5>
                                            <p className="lead mb-0">Multiple routes can be tested simultaneously.</p>
                                        </div>
                                    </Col>
                                    <Col sm={4} xl={3}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <h1>
                                                <GetAppIcon fontSize="large" />
                                            </h1>
                                            <h5>Export Data</h5>
                                            <p className="lead mb-0">Easily download/export data in a readable JSON format.</p>
                                        </div>
                                    </Col>
                                    <Col sm={4} xl={3}>
                                        <div className="mx-auto mb-0 mb-lg-3">
                                            <h1>
                                                <BarChartIcon fontSize="large" />
                                            </h1>
                                            <h5>Visualize Data</h5>
                                            <p className="lead mb-0">View results on graphs and tables.</p>
                                        </div>
                                    </Col>
                                </div>
                            </Container>
                        </div>
                        <Container fluid className="text-white text-center">
                            <div id="features" style={styles.content2}>
                                <Row>
                                    <Col className="text-center" style={{ color: 'white' }}>
                                        <h1>Get Started</h1>
                                        <h4>Install, start, and test.</h4>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                <div className="row justify-content-center">
                                    <Col sm={8} md={8} lg={4}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <img src={install} width="100%" style={{ paddingBottom: '15px' }} />
                                            <h5>1. Install and Start Server</h5>
                                        </div>
                                    </Col>
                                    <Col sm={8} md={8} lg={4}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <img src={singleroute} width="100%" style={{ paddingBottom: '15px' }} />
                                            <br />
                                            <h5>2. Test Routes and View Data</h5>
                                        </div>
                                    </Col>
                                    <Col sm={8} md={8} lg={4}>
                                        <div className="mx-auto mb-0 mb-lg-3">
                                            <img src={exportdelete} width="100%" style={{ paddingBottom: '15px' }} />
                                            <h5>3. Export or Delete Results</h5>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Container>
                        <Container fluid className="text-white text-center">
                            {/* Use team images that are at least 500px x 500px */}
                            <div id="team" style={styles.content2}>
                                <Row>
                                    <Col className="text-center" style={{ color: 'white' }}>
                                        <h1>Meet the Team</h1>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                <div className="row justify-content-center">
                                    <Col sm={8} md={8} lg={4}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <div className="image-cropper">
                                                <img src={team3} style={styles.team} />
                                            </div>
                                            <h3>Abigail Dorso</h3>
                                            <a href="https://github.com/abbydorso" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={github} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://www.linkedin.com/in/abigaildorso/" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={linkedin} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://twitter.com/abbydorso" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={twitter} height={'40px'} width={'auto'} />
                                            </a>
                                        </div>
                                    </Col>
                                    <Col sm={8} md={8} lg={4}>
                                        <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <div className="image-cropper">
                                                <img src={team1} style={styles.team} />
                                            </div>
                                            <h3>Grigor Minasyan</h3>
                                            <a href="https://github.com/grigor-minasyan/" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={github} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://www.linkedin.com/in/grigor-minasyan/" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={linkedin} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://twitter.com/grigorminas" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={twitter} height={'40px'} width={'auto'} />
                                            </a>
                                        </div>
                                    </Col>
                                    <Col sm={8} md={8} lg={4} className="align-items-center">
                                        <div className="mx-auto mb-0 mb-lg-3">
                                            <div className="image-cropper">
                                                <img src={team2} style={styles.team} />
                                            </div>
                                            <h3>Jason Charles de Vera</h3>
                                            <a href="https://github.com/jcdevera" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={github} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://www.linkedin.com/in/jason-charles-de-vera/" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={linkedin} height={'40px'} width={'auto'} />
                                            </a>
                                            <a href="https://twitter.com/jachrode" target="_blank" rel="noreferrer">
                                                <img className="social-team" src={twitter} height={'40px'} width={'auto'} />
                                            </a>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="text-center">
                <Row className="py-5" style={{ backgroundColor: bgColor }}>
                    <Col>
                        <footer style={{ backgroundColor: bgColor }}>Jagtester is Open Source and licensed under ISC.</footer>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
