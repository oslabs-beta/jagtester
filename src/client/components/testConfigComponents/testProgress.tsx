import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const TestProgrss: (props: {
    curRunningRPS: number;
    isTestRunning: boolean;
    valueRPS: number[];
    valueStartEnd: number[];
}) => JSX.Element = ({ curRunningRPS, isTestRunning, valueRPS, valueStartEnd }) => {
    const start = valueStartEnd[0];
    const end = valueStartEnd[1];
    const range = end - start;

    const calculatedPercentage =
        curRunningRPS === 0 ? 0 : Math.round((100 * (curRunningRPS + valueRPS[0] - start)) / (range + valueRPS[0]));
    return (
        <Container className="mt-5">
            <Row>
                <Col>Current percentage: {calculatedPercentage}%</Col>
                <Col>Test running: {isTestRunning.toString()}</Col>
            </Row>
        </Container>
    );
};
export default TestProgrss;
