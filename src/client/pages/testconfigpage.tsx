import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                <RangeSliders />
                <Buttons />
                <TestProgrss />
            </Col>
        </Row>
    );
};

export default TestPage;
