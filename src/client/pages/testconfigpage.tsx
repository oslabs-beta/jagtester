import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Buttons from '../components/buttonsstartstop';
import TargetInput from '../components/targetinput';
import RangeSliders from '../components/RangeSliders';

interface TestConfigData {
    rps: number;
    startRPS: number;
    endRPS: number;
    testLength: number;
}

const TestPage: () => JSX.Element = () => {
    const [valueRPS, setValueRPS] = React.useState<number[]>([25]);
    const [valueStartEnd, setValueStartEnd] = React.useState<number[]>([100, 1500]);
    const [valueSeconds, setValueSeconds] = React.useState<number[]>([2]);

    const handleChangeRPS = (event: unknown, newValue: number | number[]) => {
        setValueRPS(newValue as number[]);
    };
    const handleChangeStartEnd = (event: unknown, newValue: number | number[]) => {
        setValueStartEnd(newValue as number[]);
    };
    const handleChangeSeconds = (event: unknown, newValue: number | number[]) => {
        setValueSeconds(newValue as number[]);
    };

    const handleStartTest = () => {
        const testConfigObj: TestConfigData = {
            rps: valueRPS[0],
            startRPS: valueStartEnd[0],
            endRPS: valueStartEnd[1],
            testLength: valueSeconds[0],
        };
        console.log(testConfigObj);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <TargetInput />
                    <TargetInput />
                </Col>
                <Col>
                    <Tabs defaultActiveKey="load-tester" className="mb-4">
                        <Tab eventKey="load-tester" title="Load tester">
                            <RangeSliders
                                valueRPS={valueRPS}
                                valueStartEnd={valueStartEnd}
                                valueSeconds={valueSeconds}
                                handleChangeRPS={handleChangeRPS}
                                handleChangeStartEnd={handleChangeStartEnd}
                                handleChangeSeconds={handleChangeSeconds}
                            />
                            <Buttons handleStartTest={handleStartTest} />
                        </Tab>
                        <Tab eventKey="stress-tester" title="Stress tester">
                            stress tester
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default TestPage;
