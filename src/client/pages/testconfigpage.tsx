import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useAppSelector } from '../state/hooks';
import Buttons from '../components/testConfigComponents/buttonsstartstop';
import TargetInputs from '../components/testConfigComponents/TargetInputs';
import RangeSliders from '../components/testConfigComponents/RangeSliders';


const TestPage: () => JSX.Element = () => {
    const darkMode = useAppSelector((state) => state.darkMode);
    return (
        <Container>
        <Row className="mx-4">
            <Col>
                <Card
                    className={darkMode ? "shadow p-3 mb-5 bg-white rounded" : "default"}
                    bg={darkMode ? 'light': 'dark'} >                
                    <TargetInputs />
                </Card>
            </Col>
            <Col>
                <Card
                    className={darkMode ? "shadow p-3 mb-5 bg-white rounded" : "default"}
                    bg={darkMode ? 'light': 'dark'} >
                    <RangeSliders />
                    <Buttons />
                </Card>
            </Col>
        </Row>
        </Container>
    );
};

export default TestPage;
