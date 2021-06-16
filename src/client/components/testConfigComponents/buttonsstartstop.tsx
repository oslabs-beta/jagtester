import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';

import { HTTPMethods, TestConfigData } from '../../interfaces';
import StopButtonSpinner from './buttonStopSpinner';

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
        dispatch(Actions.SetStoppingSpinner(true));
        fetch('/api/stopTest')
            .then(() => {
                dispatch(Actions.SetStoppingSpinner(false));
            })
            .catch((err) => {
                dispatch(Actions.SetShowModal(true));
                dispatch(Actions.SetModalError(err.toString()));
            });
    };

    const handleStartTest = () => {
        dispatch(Actions.SetCurRunningRPS(0));
        dispatch(Actions.SetCurTestStartTime(Date.now()));
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
        }).catch((err) => {
            dispatch(Actions.SetShowModal(true));
            dispatch(Actions.SetModalError(err.toString()));
        });
    };

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <Button
                        disabled={jagEndabledInputs || isTestRunning}
                        block
                        onClick={handleStartTest}
                    >
                        Start Testing
                    </Button>
                </Col>
                <Col sm={4}>
                    <Button
                        disabled={jagEndabledInputs || !isTestRunning}
                        variant="danger"
                        block
                        onClick={handleStopTest}
                    >
                        Stop
                    </Button>
                </Col>
                <Col sm={4}>
                    <Button
                        variant="secondary"
                        block
                        onClick={() => dispatch(Actions.ResetState())}
                    >
                        Reset to default
                    </Button>
                </Col>
            </Row>
            <StopButtonSpinner />
        </Container>
    );
};

export default Buttons;
