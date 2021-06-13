import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import VerticalTabs from '../components/resultsComponents/verticalTabs';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Actions from '../state/actions/actions';
import { HTTPMethods } from '../interfaces';

const ResultsPage: () => JSX.Element = () => {
    const receivedData = useAppSelector((state) => state.receivedData);
    const dispatch = useAppDispatch();

    //Export JSON function
    const download = () => {
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:application/json;charset=utf-8,' +
                encodeURIComponent(JSON.stringify(receivedData, null, 4))
        );
        element.setAttribute('download', `jagtester-exportall-${new Date().toLocaleString()}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const deleteAllData = () => {
        dispatch(Actions.SetReceivedData([]));
        dispatch(Actions.SetResultsTabValue(0));
        fetch('/api/saveddata', {
            method: HTTPMethods.DELETE,
        }).catch((err) => {
            dispatch(Actions.SetShowModal(true));
            dispatch(Actions.SetModalError(err.toString()));
        });
    };

    return (
        <Container>
            {receivedData.length > 0 && (
                <Row className="mb-2">
                    <Col>
                        <ButtonGroup className="float-right">
                            <Button variant="secondary" onClick={download}>
                                Export All
                            </Button>
                            <Button variant="danger" onClick={deleteAllData}>
                                Delete All
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            )}
            <Row>
                <VerticalTabs />
            </Row>
        </Container>
    );
};

export default ResultsPage;
