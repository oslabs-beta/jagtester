import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../../state/hooks';

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles(() =>
	createStyles({
		root: {
			height: 10,
			width: '100%',
		},
		colorPrimary: {
			backgroundColor: '#3D405B',
		},
		bar: {
			backgroundColor: '#3D405B',
		},
	})
)(LinearProgress);

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});
const TestProgrss: () => JSX.Element = () => {
	const classes = useStyles();
	const isTestRunning = useAppSelector((state) => state.isTestRunning);
	const curTestTotalPercent = useAppSelector((state) => state.curTestTotalPercent);

	return (
		<Container className="m-0 p-0 mb-5" fluid>
			<Row className="m-0 p-0">
				<Col className="m-0 p-0">
					<div className={classes.root}>
						<BorderLinearProgress
							variant="determinate"
							value={curTestTotalPercent}
							color={isTestRunning ? 'secondary' : 'primary'}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default TestProgrss;
