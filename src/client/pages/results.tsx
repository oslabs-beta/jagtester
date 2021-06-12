import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import VerticalTabs from '../components/resultsComponents/verticalTabs';
import { useAppSelector } from '../state/hooks';

const ResultsPage: () => JSX.Element = () => {

    const receivedData = useAppSelector((state) => state.receivedData);

    //Export JSON function
    function download() {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(receivedData, null, 4)));
        element.setAttribute('download', `jagtester-exportall-${new Date().toLocaleString()}.json`);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }
    return (
        <Container>
            <Row className="float-right">
                <ButtonGroup>
                    <Button variant="secondary" onClick={download}>Export All</Button>
                    <Button variant="danger">Delete</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <VerticalTabs />
            </Row>
        </Container>
    );
};

export default ResultsPage;
