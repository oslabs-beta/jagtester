import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StackedBar from '../components/resultsComponents/graphs'

fetch('./jagtester/src/client/components/resultsData.json')


const ResultsPage: () => JSX.Element = () => {

    //Needs to hold state for the entire results page. 
    //one state for left column which will be an array of route names. This should access the the route names from
    //the data array

    //second state should be for right side that accesses each routes data or the entire data set -- not sure yet. 
    //by defalut maybe show only averages
    //then by clicking 


    //iterate through the array


    //MY INTERNET SUCKS ! 
    
    //Does grigor agree with my logic?

    // for each route push jsx string with an onclick event that will show data related to the specific route



    return (
        <Container>
            <Row>
                <Col xs={3}>
                    <h1>Route Results</h1>
                    Test 1
                </Col>
                <Col>
                    <StackedBar />
                </Col>
            </Row>
        </Container>
    )
};



export default ResultsPage;
