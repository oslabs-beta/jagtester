import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TargetInput from '../components/targetinput';
import RangeSliders from '../components/RangeSliders';

const TestPage: () => JSX.Element = () => {
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
                            <RangeSliders />
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
