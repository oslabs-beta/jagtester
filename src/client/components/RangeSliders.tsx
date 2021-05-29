import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function valuetext(value: number) {
    return `${value}`;
}

const SingleSlider: (props: {
    text: string;
    id: string;
    value: number | number[];
    onChange: (event: unknown, newValue: number | number[]) => void;
    getTextFunc: (value: number) => string;
}) => JSX.Element = (props) => {
    return (
        <>
            <Typography id={props.id} gutterBottom>
                {props.text}
            </Typography>
            <Slider
                className="mt-4"
                value={props.value}
                onChange={props.onChange}
                valueLabelDisplay="on"
                aria-labelledby={props.id}
                getAriaValueText={props.getTextFunc}
                valueLabelFormat={props.getTextFunc}
                id={props.id}
            />
        </>
    );
};

const RangeSliders: () => JSX.Element = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: unknown, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={classes.root}>
            <SingleSlider text="Start / end RPS" id="start-end-slider" value={value} onChange={handleChange} getTextFunc={valuetext} />
            <SingleSlider text="RPS interval" id="rps-interval-slider" value={value} onChange={handleChange} getTextFunc={valuetext} />
            <SingleSlider text="Time per interval" id="time-per-int-slider" value={value} onChange={handleChange} getTextFunc={valuetext} />
        </div>
    );
};

export default RangeSliders;
