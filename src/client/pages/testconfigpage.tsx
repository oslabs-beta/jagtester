import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';

import { io } from 'socket.io-client';
const ENDPOINT = '/socketapi';

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
    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on('FromAPI', (data) => {
            console.log(data);
        });
    }, []);

    // states for rps sliders
    const [valueRPS, setValueRPS] = React.useState<number[]>([10]);
    const [valueStartEnd, setValueStartEnd] = React.useState<number[]>([100, 120]);
    const [valueSeconds, setValueSeconds] = React.useState<number[]>([1]);

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

    const handleStartTest = () => {
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
                <TargetInputs inputsData={inputsData} setInputsData={setInputsData} HTTPMethods={HTTPMethods} />
            </Col>
            <Col>
                <Tabs defaultActiveKey="load-tester" className="mb-4">
                    <Tab eventKey="load-tester" title="Load tester">
                        <RangeSliders
                            valueRPS={valueRPS}
                            valueStartEnd={valueStartEnd}
                            valueSeconds={valueSeconds}
                            setValueRPS={setValueRPS}
                            setValueStartEnd={setValueStartEnd}
                            setValueSeconds={setValueSeconds}
                        />
                        <Buttons
                            isDisabled={inputsData.some((target) => !target.jagTesterEnabled)}
                            handleStartTest={handleStartTest}
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
