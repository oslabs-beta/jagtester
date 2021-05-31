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
    value: number | number[];
    onChange: (event: unknown, newValue: number | number[]) => void;
    getTextFunc: (value: number) => string;
    min: number;
    max: number;
    step: number;
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
                        valueLabelDisplay="on"
                        aria-labelledby={props.id}
                        getAriaValueText={props.getTextFunc}
                        valueLabelFormat={props.getTextFunc}
                        id={props.id}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                    />
                </Col>
            </Row>
        </>
    );
};

const RangeSliders: (props: {
    valueRPS: number[];
    valueStartEnd: number[];
    valueSeconds: number[];
    handleChangeRPS: (event: unknown, newValue: number | number[]) => void;
    handleChangeStartEnd: (event: unknown, newValue: number | number[]) => void;
    handleChangeSeconds: (event: unknown, newValue: number | number[]) => void;
}) => JSX.Element = ({
    valueRPS,
    valueStartEnd,
    valueSeconds,
    handleChangeRPS,
    handleChangeStartEnd,
    handleChangeSeconds,
}) => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <SingleSlider
                            text="RPS interval"
                            id="rps-interval-slider"
                            value={valueRPS}
                            onChange={handleChangeRPS}
                            getTextFunc={valuetext}
                            min={10}
                            max={500}
                            step={10}
                        />
                        <SingleSlider
                            text="Start / end RPS"
                            id="start-end-slider"
                            value={valueStartEnd}
                            onChange={handleChangeStartEnd}
                            getTextFunc={valuetext}
                            min={100}
                            max={10000}
                            step={valueRPS[0]}
                        />
                        <SingleSlider
                            text="Time per interval (seconds)"
                            id="time-per-int-slider"
                            value={valueSeconds}
                            onChange={handleChangeSeconds}
                            getTextFunc={valuetext}
                            min={1}
                            max={10}
                            step={1}
                        />
                    </Col>
                </Row>
            </Container>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h2 className="text-center">
                            Total test time:{' '}
                            {Math.round((valueSeconds[0] * (valueStartEnd[1] - valueStartEnd[0])) / valueRPS[0])}{' '}
                            seconds
                        </h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RangeSliders;
