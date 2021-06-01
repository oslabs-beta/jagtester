import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Buttons: (props: { handleStartTest: () => void }) => JSX.Element = ({ handleStartTest }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Button block onClick={handleStartTest}>
                        Start testing
                    </Button>
                </Col>
                <Col>
                    <Button variant="danger" block>
                        Stop and get data
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Buttons;
