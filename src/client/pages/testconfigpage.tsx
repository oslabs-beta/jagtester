import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';
import TestProgrss from '../components/testConfigComponents/testProgress';

const TestPage: () => JSX.Element = () => {
    return (
        <Row>
            <Col>
                <TargetInputs />
            </Col>
            <Col>
                <Tabs defaultActiveKey="load-tester" className="mb-4">
                    <Tab eventKey="load-tester" title="Load tester">
                        <RangeSliders />
                        <Buttons />
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
