import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../../state/hooks';

const TestProgrss: () => JSX.Element = () => {
    const valueRPS = useAppSelector((state) => state.valueRPS);
    const valueStart = useAppSelector((state) => state.valueStart);
    const valueEnd = useAppSelector((state) => state.valueEnd);
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const curRunningRPS = useAppSelector((state) => state.curRunningRPS);

    const start = valueStart;
    const end = valueEnd;
    const range = end - start;

    const calculatedPercentage =
        curRunningRPS === 0
            ? 0
            : Math.round((100 * (curRunningRPS + valueRPS - start)) / (range + valueRPS));
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
