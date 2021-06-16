import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardColumns from 'react-bootstrap/CardColumns';

const Features: () => JSX.Element = () => {
    return (
        <Container>
            <Row xs={1} sm={1} md={1} lg={2} xl={2}>
                <Col>
                    <Card text="white" className="shadow p-3 mb-5 bg-transparent rounded">
                        <Card.Body>
                            <Card.Title>Custom Test Configurations</Card.Title>
                            <Card.Text>
                                This feature allows you to fully customize your server load test. Having the
                                ability to adjust the routes being tested, the percentage per route, the
                                amount of requests, and the frequency of the requests.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
            <Card text="white"  className="shadow p-3 mb-5 bg-transparent rounded" >
                <Card.Body>
                    <Card.Title>Stop Testing</Card.Title>
                    <Card.Text>
                        Jagtester has the ability to stop the test at any point, and still retrieve
                        the data that has been collected so far.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card text="white" className="shadow p-3 mb-5 bg-transparent rounded">
                <Card.Body>
                    <Card.Title>Results Visualization Page</Card.Title>
                    <Card.Text>
                        After running one or multiple tests, you can view all the results on the
                        results page. Results will be displayed in graphes and tables.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card text="white" className="shadow p-3 mb-5 bg-transparent rounded">
                <Card.Body>
                    <Card.Title>Exportable Data</Card.Title>
                    <Card.Text>
                        You will have the ability to export one or all test results.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
};

export default Features;
