import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import VerticalTabs from '../components/resultsComponents/verticalTabs';

// fetch('./jagtester/src/client/components/resultsData.json')

const ResultsPage: () => JSX.Element = () => {
    return (
        <Container>
            <Row>
                <VerticalTabs />
            </Row>
        </Container>
    );
};

export default ResultsPage;
