import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SingleSlider from './SingleSlider';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
import Typography from '@material-ui/core/Typography';

import HighRPSWarning from './highrpswarning';

const RangeSliders: () => JSX.Element = () => {
	const MAXRPS = 1000,
		MAXRPSEND = 20000,
		MAXSECONDS = 20;
	const valueRPS = useAppSelector((state) => state.valueRPS);
	const valueStart = useAppSelector((state) => state.valueStart);
	const valueEnd = useAppSelector((state) => state.valueEnd);
	const valueSeconds = useAppSelector((state) => state.valueSeconds);
	const isTestRunning = useAppSelector((state) => state.isTestRunning);
	const curTestTotalPercent = useAppSelector((state) => state.curTestTotalPercent);
	const curTestStartTime = useAppSelector((state) => state.curTestStartTime);
	const dispatch = useAppDispatch();

	const handleChangeRPS = (event: unknown, newValue: number | number[]) => {
		dispatch(Actions.SetValueRPS(newValue as number));
		dispatch(Actions.SetValueEnd(Math.min(MAXRPSEND, valueStart + 15 * valueRPS)));
		dispatch(Actions.SetCurRunningRPS(0));
	};
	const handleChangeSeconds = (event: unknown, newValue: number | number[]) => {
		dispatch(Actions.SetValueSeconds(newValue as number));
	};
	const handleChangeStartEnd = (event: unknown, newValue: number | number[]) => {
		dispatch(Actions.SetValueStart((newValue as number[])[0]));
		dispatch(Actions.SetValueEnd((newValue as number[])[1]));
		dispatch(Actions.SetCurRunningRPS(0));
	};

	const approximateTestTime = (valueSeconds * (valueEnd + valueRPS - valueStart)) / valueRPS;
	const curElapsedTime = (Date.now() - curTestStartTime) / 1000;
	const estimatedTime = Math.min(
		(curElapsedTime * (100 - curTestTotalPercent)) / curTestTotalPercent,
		approximateTestTime * 100
	);

	return (
		<div>
			<Container className="px-3 py-0">
				<Row>
					<Col>
						<SingleSlider
							text="RPS interval"
							id="rps-interval-slider"
							key="rps-interval-slider"
							value={valueRPS}
							onChange={handleChangeRPS}
							min={10}
							max={MAXRPS}
							step={10}
							marks={{ interval: 100, min: 10, max: MAXRPS }}
							disabled={isTestRunning}
							extraLabel={`${valueRPS} request per second`}
						/>
						<SingleSlider
							text="Start / end RPS"
							id="start-end-slider"
							key="start-end-slider"
							value={[valueStart, valueEnd]}
							onChange={handleChangeStartEnd}
							min={100}
							max={MAXRPSEND}
							step={valueRPS}
							marks={{ interval: 5000, min: 100, max: MAXRPSEND }}
							disabled={isTestRunning}
							extraLabel={`Start: ${valueStart} / End: ${valueEnd}`}
						/>
						<SingleSlider
							text="Time per interval"
							id="time-per-int-slider"
							key="time-per-int-slider"
							value={valueSeconds}
							onChange={handleChangeSeconds}
							min={1}
							max={MAXSECONDS}
							step={1}
							marks={{ interval: 1, min: 1, max: MAXSECONDS }}
							disabled={isTestRunning}
							extraLabel={`${valueSeconds} second${
								valueSeconds === 1 ? '' : 's'
							} per interval`}
						/>
					</Col>
				</Row>
			</Container>
			<Container className="mt-5">
				<Row>
					<Col>
						{isTestRunning ? (
							<Typography paragraph variant="h4" align="center">
								Estimated time remaining: {Math.round(estimatedTime)} seconds
							</Typography>
						) : (
							<Typography paragraph variant="h4" align="center">
								Approximate test time: {Math.round(approximateTestTime)} seconds
							</Typography>
						)}
						<HighRPSWarning />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default RangeSliders;
