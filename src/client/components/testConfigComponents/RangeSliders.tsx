import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SingleSlider from './SingleSlider';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';

const RangeSliders: () => JSX.Element = () => {
    const valueRPS = useAppSelector((state) => state.valueRPS);
    // const valueStartEnd = useAppSelector((state) => state.valueStartEnd);
    const valueStart = useAppSelector((state) => state.valueStart);
    const valueEnd = useAppSelector((state) => state.valueEnd);
    const valueSeconds = useAppSelector((state) => state.valueSeconds);
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const dispatch = useAppDispatch();

    const handleChangeRPS = (event: unknown, newValue: number | number[]) => {
        dispatch(Actions.SetValueRPS(newValue as number));
        dispatch(Actions.SetValueEnd(Math.min(10000, valueStart + 15 * valueRPS)));
        // dispatch(
        //     Actions.SetValueStartEnd([
        //         valueStartEnd[0],
        //         Math.min(10000, valueStartEnd[0] + 15 * valueRPS),
        //     ])
        // );
    };
    const handleChangeStart = (event: unknown, newValue: number | number[]) => {
        dispatch(Actions.SetValueStart(newValue as number));
    };
    const handleChangeEnd = (event: unknown, newValue: number | number[]) => {
        dispatch(Actions.SetValueEnd(newValue as number));
    };
    // const handleChangeStartEnd = (event: unknown, newValue: number | number[]) => {
    //     dispatch(Actions.SetValueStartEnd(newValue as number[]));
    // };
    const handleChangeSeconds = (event: unknown, newValue: number | number[]) => {
        dispatch(Actions.SetValueSeconds(newValue as number));
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <SingleSlider
                            text="RPS interval"
                            id="rps-interval-slider"
                            key="rps-interval-slider"
                            value={valueRPS}
                            onChange={handleChangeRPS}
                            min={10}
                            max={500}
                            step={10}
                            marks={{ interval: 100, min: 10, max: 500 }}
                            disabled={isTestRunning}
                        />
                        <SingleSlider
                            text="Start RPS"
                            id="start-rps-slider"
                            key="start-rps-slider"
                            value={valueStart}
                            onChange={handleChangeStart}
                            min={100}
                            max={valueEnd}
                            step={10}
                            // marks={{ interval: (valueEnd - 100) / 5, min: 100, max: valueEnd }}
                            disabled={isTestRunning}
                        />
                        <SingleSlider
                            text="End RPS"
                            id="end-rps-slider"
                            key="end-rps-slider"
                            value={valueEnd}
                            onChange={handleChangeEnd}
                            min={valueStart}
                            max={10000}
                            step={valueRPS}
                            // marks={{
                            //     interval: (10000 - valueStart) / 5,
                            //     min: valueStart,
                            //     max: 10000,
                            // }}
                            disabled={isTestRunning}
                        />
                        {/* <SingleSlider
                            text="Start / end RPS"
                            id="start-end-slider"
                            key="start-end-slider"
                            value={valueStartEnd}
                            onChange={handleChangeStartEnd}
                            min={100}
                            max={10000}
                            step={valueRPS}
                            marks={{ interval: 2000, min: 100, max: 10000 }}
                            disabled={isTestRunning}
                        /> */}
                        <SingleSlider
                            text="Time per interval (seconds)"
                            id="time-per-int-slider"
                            key="time-per-int-slider"
                            value={valueSeconds}
                            onChange={handleChangeSeconds}
                            min={1}
                            max={10}
                            step={1}
                            marks={{ interval: 1, min: 1, max: 10 }}
                            disabled={isTestRunning}
                        />
                    </Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h2 className="text-center">
                            Total test time:{' '}
                            {Math.round(
                                (valueSeconds * (valueEnd + valueRPS - valueStart)) / valueRPS
                            )}{' '}
                            seconds
                        </h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RangeSliders;
