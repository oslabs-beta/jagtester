import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';

import { HTTPMethods, TestConfigData } from '../../interfaces';

const Buttons: () => JSX.Element = () => {
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const valueRPS = useAppSelector((state) => state.valueRPS);
    const valueStart = useAppSelector((state) => state.valueStart);
    const valueEnd = useAppSelector((state) => state.valueEnd);
    const valueSeconds = useAppSelector((state) => state.valueSeconds);
    const inputsData = useAppSelector((state) => state.inputsData);
    const dispatch = useAppDispatch();

    const jagEndabledInputs = inputsData.some((target) => !target.jagTesterEnabled);

    const handleStopTest = () => {
        fetch('/api/stopTest'); // TODO add then catch
    };

    const handleStartTest = () => {
        dispatch(Actions.SetCurRunningRPS(0));
        const testConfigObj: TestConfigData = {
            rpsInterval: valueRPS,
            startRPS: valueStart,
            endRPS: valueEnd,
            testLength: valueSeconds,
            inputsData,
        };
        fetch('/api/startmultiple', {
            method: HTTPMethods.POST,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(testConfigObj),
        })
            .then((res) => console.log('received response, ', res)) // TODO if not jagtester enabled, show error message
            .catch((err) => console.log(err)); // TODO fix the error handling
    };

    return (
        <Container>
            <Row>
                <Col sm={2}></Col>
                <Col sm={4}>
                    <Button
                        disabled={jagEndabledInputs || isTestRunning}
                        block
                        onClick={handleStartTest}
                    >
                        Start testing
                    </Button>
                </Col>
                <Col sm={4}>
                    <Button
                        disabled={jagEndabledInputs || !isTestRunning}
                        variant="danger"
                        block
                        onClick={handleStopTest}
                        href="/results"
                    >
                        Stop and get data
                    </Button>
                </Col>
                <Col>
                    <Button
                        // class="btn btn-default" 
                        block
                        href="/results"
                    >
                        Get Results
                    </Button>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container>
    );
};

export default Buttons;
