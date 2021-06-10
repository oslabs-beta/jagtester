import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';

const TestPage: () => JSX.Element = () => {
    return (
        <Row className="mx-4">
            <Col>
                <TargetInputs />
            </Col>
            <Col>
                <RangeSliders />
                <Buttons />
            </Col>
        </Row>
    );
};

export default TestPage;
