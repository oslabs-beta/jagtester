import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SingleSlider from './SingleSlider';

const RangeSliders: (props: {
    valueRPS: number[];
    valueStartEnd: number[];
    valueSeconds: number[];
    setValueRPS: (value: React.SetStateAction<number[]>) => void;
    setValueStartEnd: (value: React.SetStateAction<number[]>) => void;
    setValueSeconds: (value: React.SetStateAction<number[]>) => void;
    isTestRunning: boolean;
}) => JSX.Element = ({
    valueRPS,
    valueStartEnd,
    valueSeconds,
    setValueRPS,
    setValueStartEnd,
    setValueSeconds,
    isTestRunning,
}) => {
    const handleChangeRPS = (event: unknown, newValue: number | number[]) => {
        setValueRPS(newValue as number[]);
        setValueStartEnd([valueStartEnd[0], Math.min(10000, valueStartEnd[0] + 15 * valueRPS[0])]);
    };
    const handleChangeStartEnd = (event: unknown, newValue: number | number[]) => {
        setValueStartEnd(newValue as number[]);
    };
    const handleChangeSeconds = (event: unknown, newValue: number | number[]) => {
        setValueSeconds(newValue as number[]);
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
                            text="Start / end RPS"
                            id="start-end-slider"
                            key="start-end-slider"
                            value={valueStartEnd}
                            onChange={handleChangeStartEnd}
                            min={100}
                            max={10000}
                            step={valueRPS[0]}
                            marks={{ interval: 2000, min: 100, max: 10000 }}
                            disabled={isTestRunning}
                        />
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
                                (valueSeconds[0] * (valueStartEnd[1] + valueRPS[0] - valueStartEnd[0])) / valueRPS[0]
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
