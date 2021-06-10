import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../../state/hooks';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

const TestProgrss: () => JSX.Element = () => {
    const classes = useStyles();
    const valueRPS = useAppSelector((state) => state.valueRPS);
    const valueStart = useAppSelector((state) => state.valueStart);
    const valueEnd = useAppSelector((state) => state.valueEnd);
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const curRunningRPS = useAppSelector((state) => state.curRunningRPS);

    const start = valueStart;
    const end = valueEnd;
    const range = end - start;

    const calculatedPercentage =
        curRunningRPS === 0
            ? 0
            : Math.round((100 * (curRunningRPS + valueRPS - start)) / (range + valueRPS));

    return (
        <Container className="mt-5" fluid>
            <Row>
                <div className={classes.root}>
                    <LinearProgressWithLabel
                        value={calculatedPercentage}
                        color={isTestRunning ? 'secondary' : 'primary'}
                    />
                </div>
            </Row>
        </Container>
    );
};

export default TestProgrss;
