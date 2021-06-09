import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StackedBar from '../components/resultsComponents/graphs';
import * as data from '../components/resultsComponents/data-updated.json';

import VerticalTabs from '../components/resultsComponents/verticalTabs';

// fetch('./jagtester/src/client/components/resultsData.json')

const ResultsPage: () => JSX.Element = () => {
    //Needs to hold state for the entire results page.
    //one state for left column which will be an array of route names. This should access the the route names from
    //the data array

    //second state should be for right side that accesses each routes data or the entire data set -- not sure yet.
    //by defalut maybe show only averages
    //then by clicking

    return (
        <Container>
            <Row>
                <VerticalTabs />
            </Row>
        </Container>
    );
};

export default ResultsPage;
