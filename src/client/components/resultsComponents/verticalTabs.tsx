import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import StackedBar from './graphs';
import DenseTable from './tables';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
import noresults from '../../img/noresults.png';

import TabLabels from './verticalTabLabels';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tab from '@material-ui/core/Tab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        width: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};

const VerticalTabs: () => JSX.Element = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const resultsTabValue = useAppSelector((state) => state.resultsTabValue);

    const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
        dispatch(Actions.SetResultsTabValue(newValue));
    };

    const receivedData = useAppSelector((state) => state.receivedData);

    //pushing tab data
    const tabsArr: JSX.Element[] = [];
    const tabPanelsArr: JSX.Element[] = [];
    for (let i = 0; i < receivedData.length; i++) {
        const singleTest = receivedData[i];
        // tabsArr.push(<TabLabels index={i} key={i} time={singleTest.testTime} />);
        tabsArr.push(
            <Tab
                label={<TabLabels index={i} time={singleTest.testTime} />}
                key={i}
                {...a11yProps(i)}
            />
        );
        const routeNames: JSX.Element[] = [];

        Object.keys(singleTest.testData[Object.keys(singleTest.testData)[0]]).forEach(
            (routeName, j) => {
                routeNames.push(
                    <Col key={`col-${j}`}>
                        <Card raised className="mb-5 mt-0">
                            <CardContent>
                                <StackedBar
                                    testData={singleTest.testData}
                                    singleRoute={true}
                                    routeName={routeName}
                                />
                                <DenseTable routeData={singleTest.testData} routeName={routeName} />
                            </CardContent>
                        </Card>
                    </Col>
                );
            }
        );
        tabPanelsArr.push(
            <TabPanel value={resultsTabValue} index={i} key={i}>
                <Col key={-1} className={'mb-5'}>
                    <Card raised className="mb-5 mt-0">
                        <CardContent>
                            <StackedBar testData={singleTest.testData} singleRoute={false} />
                        </CardContent>
                    </Card>
                </Col>
                {routeNames}
            </TabPanel>
        );
    }
    return (
        <Container fluid>
            {receivedData.length !== 0 && (
                <Row>
                    <Col sm={3}>
                        <Tabs
                            orientation="vertical"
                            variant="standard"
                            value={resultsTabValue}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            {tabsArr}
                        </Tabs>
                    </Col>
                    <Col sm={9}>{tabPanelsArr}</Col>
                </Row>
            )}
            {receivedData.length === 0 && (
                <Row>
                    <Col>
                        <h1 className="text-center">
                            Oops! No results are available!
                            <br />
                            Go back and start a test on your server.
                        </h1>{' '}
                        <Container className="justify-content-center" fluid>
                            <Row xs={12}>
                                <img
                                    src={noresults}
                                    style={{
                                        margin: 'auto',
                                        width: '75%',
                                        height: '75%',
                                    }}
                                />
                            </Row>
                        </Container>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default VerticalTabs;
