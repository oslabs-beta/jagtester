import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';
import TestProgrss from '../components/testConfigComponents/testProgress';

import socketIOClient from 'socket.io-client';

import { useAppSelector, useAppDispatch } from '../state/hooks';
import Actions from '../state/actions/actions';

import { HTTPMethods } from '../interfaces';

const socket = socketIOClient();

interface TestConfigData {
    rpsInterval: number;
    startRPS: number;
    endRPS: number;
    testLength: number;
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number; // TODO backend still using number[] for percentage
        jagTesterEnabled: boolean;
    }[];
}

const TestPage: () => JSX.Element = () => {
    // states for rps sliders
    const valueRPS = useAppSelector((state) => state.valueRPS);
    const valueStart = useAppSelector((state) => state.valueStart);
    const valueEnd = useAppSelector((state) => state.valueEnd);
    const valueSeconds = useAppSelector((state) => state.valueSeconds);
    const inputsData = useAppSelector((state) => state.inputsData);
    const dispatch = useAppDispatch();

    // start----------------------------------- socket io funcitonality
    socket.on('singleRPSfinished', (rps: number) => {
        dispatch(Actions.SetCurRunningRPS(rps));
    });
    socket.on('testRunningStateChange', (isTestRunning: boolean) => {
        dispatch(Actions.SetIsTestRunning(isTestRunning));
    });

    // end  ----------------------------------- socket io funcitonality

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
        <Row>
            <Col>
                <TargetInputs />
            </Col>
            <Col>
                <Tabs defaultActiveKey="load-tester" className="mb-4">
                    <Tab eventKey="load-tester" title="Load tester">
                        <RangeSliders />
                        <Buttons
                            jagEndabledInputs={inputsData.some(
                                (target) => !target.jagTesterEnabled
                            )}
                            handleStartTest={handleStartTest}
                        />
                        <TestProgrss />
                    </Tab>
                    <Tab eventKey="stress-tester" title="Stress tester">
                        stress tester
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
};

export default TestPage;
