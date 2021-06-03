import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Buttons: (props: {
    handleStartTest: () => void;
    jagEndabledInputs: boolean;
    isTestRunning: boolean;
}) => JSX.Element = ({ handleStartTest, jagEndabledInputs, isTestRunning }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Button disabled={jagEndabledInputs || isTestRunning} block onClick={handleStartTest}>
                        Start testing
                    </Button>
                </Col>
                <Col>
                    <Button disabled={jagEndabledInputs || !isTestRunning} variant="danger" block>
                        Stop and get data
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Buttons;
