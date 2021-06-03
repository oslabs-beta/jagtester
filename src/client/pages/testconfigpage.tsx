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

const socket = socketIOClient();

interface TestConfigData {
    rpsInterval: number;
    startRPS: number;
    endRPS: number;
    testLength: number;
    inputsData: {
        method: string;
        targetURL: string;
        percentage: number[];
        jagTesterEnabled: boolean;
    }[];
}

//---------------------------- suppoerted http methods
const HTTPMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    HEAD: 'HEAD',
    CONNECT: 'CONNECT',
    TRACE: 'TRACE',
};

const TestPage: () => JSX.Element = () => {
    // states for rps sliders
    const [valueRPS, setValueRPS] = React.useState<number[]>([500]);
    const [valueStartEnd, setValueStartEnd] = React.useState<number[]>([100, 100]);
    const [valueSeconds, setValueSeconds] = React.useState<number[]>([1]);
    const [isTestRunning, setIsTestRunning] = React.useState<boolean>(false);
    const [curRunningRPS, setCurRunningRPS] = React.useState<number>(0);
    // state for the inputs
    const [inputsData, setInputsData] = React.useState([
        {
            method: HTTPMethods.GET,
            targetURL: 'http://localhost:3030',
            percentage: [20],
            jagTesterEnabled: true,
        },
        {
            method: HTTPMethods.GET,
            targetURL: 'http://localhost:3030/testroute',
            percentage: [80],
            jagTesterEnabled: true,
        },
    ]);

    // start----------------------------------- socket io funcitonality
    socket.on('singleRPSfinished', (rps: number) => {
        setCurRunningRPS(rps);
    });
    socket.on('testRunningStateChange', (isTestRunning: boolean) => {
        setIsTestRunning(isTestRunning);
    });

    // end  ----------------------------------- socket io funcitonality

    const handleStartTest = () => {
        setCurRunningRPS(0);
        const testConfigObj: TestConfigData = {
            rpsInterval: valueRPS[0],
            startRPS: valueStartEnd[0],
            endRPS: valueStartEnd[1],
            testLength: valueSeconds[0],
            inputsData,
        };
        fetch('/api/startmultiple', {
            method: HTTPMethods.POST,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(testConfigObj),
        })
            .then((res) => console.log('received response, ', res)) // TODO if not jagtester enabled, show error message
            .catch((err) => console.log(err)); // TODO fix the error handling

        // console.log(testConfigObj);
    };

    return (
        <Row>
            <Col>
                <TargetInputs
                    isTestRunning={isTestRunning}
                    inputsData={inputsData}
                    setInputsData={setInputsData}
                    HTTPMethods={HTTPMethods}
                />
            </Col>
            <Col>
                <Tabs defaultActiveKey="load-tester" className="mb-4">
                    <Tab eventKey="load-tester" title="Load tester">
                        <RangeSliders
                            isTestRunning={isTestRunning}
                            valueRPS={valueRPS}
                            valueStartEnd={valueStartEnd}
                            valueSeconds={valueSeconds}
                            setValueRPS={setValueRPS}
                            setValueStartEnd={setValueStartEnd}
                            setValueSeconds={setValueSeconds}
                        />
                        <Buttons
                            jagEndabledInputs={inputsData.some((target) => !target.jagTesterEnabled)}
                            isTestRunning={isTestRunning}
                            handleStartTest={handleStartTest}
                        />
                        <TestProgrss
                            curRunningRPS={curRunningRPS}
                            isTestRunning={isTestRunning}
                            valueRPS={valueRPS}
                            valueStartEnd={valueStartEnd}
                        />
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
