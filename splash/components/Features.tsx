import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

const Features: () => JSX.Element = () => {
    return (
        <CardColumns>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Custom Test Configurations</Card.Title>
                    <Card.Text>
                        This feature allows you to fully customize your server load test. Having the
                        ability to adjust the routes being tested, the percentage per route, the
                        amount of requests, and the frequency of the requests.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <blockquote className="blockquote mb-0 card-body">
                    <p>Jagtester&apos;s Main Features</p>
                </blockquote>
            </Card>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Stop Testing</Card.Title>
                    <Card.Text>
                        Jagtester has the ability to stop the test at any point, and still retrieve
                        the data that has been collected so far.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="text-center shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Results Visualization Page</Card.Title>
                    <Card.Text>
                        After running one or multiple tests, you can view all the results on the
                        results page. Results will be displayed in graphes and tables.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Exportable Data</Card.Title>
                    <Card.Text>
                        You will have the ability to export one or all test results.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Dark Mode!</Card.Title>
                    <Card.Text>Get your testing done in either light or dark mode.</Card.Text>
                </Card.Body>
            </Card>
        </CardColumns>
    );
};

export default Features;
