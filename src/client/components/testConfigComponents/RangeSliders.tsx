import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function valuetext(value: number) {
    return `${value}`;
}

const SingleSlider: (props: {
    text: string;
    id: string;
    key: string;
    value: number | number[];
    onChange: (event: unknown, newValue: number | number[]) => void;
    getTextFunc: (value: number) => string;
    min: number;
    max: number;
    step: number;
    marks: {
        value: number;
        label: string;
    }[];
}) => JSX.Element = (props) => {
    return (
        <>
            <Row className="mt-5">
                <Col md={4}>
                    <Typography id={props.id}>{props.text}</Typography>
                </Col>
                <Col>
                    <Slider
                        value={props.value}
                        onChange={props.onChange}
                        valueLabelDisplay="auto"
                        aria-labelledby={props.id}
                        getAriaValueText={props.getTextFunc}
                        valueLabelFormat={props.getTextFunc}
                        id={props.id}
                        key={props.id}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        marks={props.marks}
                    />
                </Col>
            </Row>
        </>
    );
};

// generates marks for the sliders
const marks = (interval: number, min: number, max: number) => {
    const marksArr: {
        value: number;
        label: string;
    }[] = [];

    // making sure it doesnt push the same value, which will cause react same key error
    if (min !== interval) {
        marksArr.push({ value: min, label: min.toString() });
    }
    for (let i = interval; i <= max; i += interval) {
        marksArr.push({ value: i, label: i.toString() });
    }
    return marksArr;
};

const RangeSliders: (props: {
    valueRPS: number[];
    valueStartEnd: number[];
    valueSeconds: number[];
    setValueRPS: (value: React.SetStateAction<number[]>) => void;
    setValueStartEnd: (value: React.SetStateAction<number[]>) => void;
    setValueSeconds: (value: React.SetStateAction<number[]>) => void;
}) => JSX.Element = ({ valueRPS, valueStartEnd, valueSeconds, setValueRPS, setValueStartEnd, setValueSeconds }) => {
    const handleChangeRPS = (event: unknown, newValue: number | number[]) => {
        setValueRPS(newValue as number[]);

        //calcuatiing the ending time to make sure it matches the RPS
        // let endTime = 100 + Math.round(valueStartEnd[1] / valueRPS[0]) * valueRPS[0];
        // endTime = Math.min(Math.max(valueStartEnd[0], endTime), 10000);
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
                            getTextFunc={valuetext}
                            min={10}
                            max={500}
                            step={10}
                            marks={marks(100, 10, 500)}
                        />
                        <SingleSlider
                            text="Start / end RPS"
                            id="start-end-slider"
                            key="start-end-slider"
                            value={valueStartEnd}
                            onChange={handleChangeStartEnd}
                            getTextFunc={valuetext}
                            min={100}
                            max={10000}
                            step={valueRPS[0]}
                            marks={marks(2000, 100, 10000)}
                        />
                        <SingleSlider
                            text="Time per interval (seconds)"
                            id="time-per-int-slider"
                            key="time-per-int-slider"
                            value={valueSeconds}
                            onChange={handleChangeSeconds}
                            getTextFunc={valuetext}
                            min={1}
                            max={10}
                            step={1}
                            marks={marks(1, 1, 10)}
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
