import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAppSelector } from '../../state/hooks';

const SingleSlider: (props: {
    text: string;
    id: string;
    key: string;
    value: number | number[];
    onChange: (event: unknown, newValue: number | number[]) => void;
    min: number;
    max: number;
    step: number;
    marks?: {
        interval: number;
        min: number;
        max: number;
    };
    disabled?: boolean;
    extraLabel?: string;
    extraLabelDanger?: string | undefined;
}) => JSX.Element = (props) => {
    const darkMode = useAppSelector((state) => state.darkMode);
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

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <>
            <Row className="mt-3">
                <Col md={3}>
                    <Typography id={props.id}>{props.text}</Typography>
                    <Typography variant="caption">{props.extraLabel}</Typography>
                </Col>
                <Col>
                    <Slider
                        disabled={props.disabled === undefined ? false : props.disabled}
                        value={props.value}
                        onChange={props.onChange}
                        valueLabelDisplay="auto"
                        aria-labelledby={props.id}
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                        id={props.id}
                        key={props.id}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        color={darkMode ? 'secondary' : 'primary'}
                        marks={
                            props.marks &&
                            marks(props.marks.interval, props.marks.min, props.marks.max)
                        }
                    />
                </Col>
            </Row>
        </>
    );
};

export default SingleSlider;
