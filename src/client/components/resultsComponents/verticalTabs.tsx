import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { AllPulledDataFromTest } from '../../interfaces';
import StackedBar from './graphs';
import DenseTable from './tables'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
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

const VerticalTabs: () => JSX.Element = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
        setTabValue(newValue);
    };

    const [receivedData, setReceivedData] = React.useState<AllPulledDataFromTest[]>([]);

    useEffect(() => {
        fetch('/api/data-with-timestamp')
            .then((res) => res.json())
            .then((data: AllPulledDataFromTest[]) => {
                setReceivedData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    //pushing tab data
    const tabsArr: JSX.Element[] = [];
    const tabPanelsArr: JSX.Element[] = [];
    for (let i = 0; i < receivedData.length; i++) {
        const singleTest = receivedData[i];
        tabsArr.push(
            <Tab label={new Date(singleTest.testTime).toLocaleString()} {...a11yProps(i)} key={i} />
        );

        const routeNames: JSX.Element[] = [];

        Object.keys(singleTest.testData[Object.keys(singleTest.testData)[0]]).forEach(
            (routeName, j) => {
                routeNames.push(
                    <Col key={`col-${j}`}>
                        <StackedBar
                            testData={singleTest.testData}
                            singleRoute={true}
                            routeName={routeName}
                        />
                        <DenseTable routeData={singleTest.testData} routeName={routeName}/>
                    </Col>
                );
            }
        );
        tabPanelsArr.push(
            <TabPanel value={tabValue} index={i} key={i}>
                <StackedBar testData={singleTest.testData} singleRoute={false} key={-1} />
                {routeNames}
            </TabPanel>
        );
    }
    return (
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <Tabs
                        orientation="vertical"
                        variant="standard"
                        value={tabValue}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        {tabsArr}
                    </Tabs>
                </Col>
                <Col sm={9}>{tabPanelsArr}</Col>
            </Row>
        </Container>
    );
};

export default VerticalTabs;
