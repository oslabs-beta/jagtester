import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Buttons: (props: { handleStartTest: () => void; isDisabled: boolean }) => JSX.Element = ({
    handleStartTest,
    isDisabled,
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Button disabled={isDisabled} block onClick={handleStartTest}>
                        Start testing
                    </Button>
                </Col>
                <Col>
                    <Button disabled={isDisabled} variant="danger" block>
                        Stop and get data
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Buttons;
