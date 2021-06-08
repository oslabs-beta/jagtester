import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import SingleSlider from './SingleSlider';

import { HTTPMethods } from '../../interfaces';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
//---------------------------- some styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        methodInput: {
            margin: theme.spacing(1),
            marginRight: theme.spacing(2),
            minWidth: '20%',
        },
        methodURL: {
            margin: theme.spacing(1),
            minWidth: '62%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        addIcon: {
            fontSize: '3rem',
            '&:hover': {
                color: '#2c3b8f', // TODO add more consistent styling
            },
        },
        deleteIcon: {
            fontSize: '3rem',
            '&:hover': {
                color: '#c20045', // TODO add more consistent styling
            },
        },
    })
);

//---------------------------- will render single targets based on the state passed down from the parent
const TartgetInputs: () => JSX.Element = () => {
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const inputsData = useAppSelector((state) => state.inputsData);
    const dispatch = useAppDispatch();

    const handleChangeMethod = (index: number, event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(
            Actions.ChangeTargetMethod({ index: index, method: event.target.value as HTTPMethods })
        );
    };

    const handleChangeURL = (
        inputDataIndex: number,
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        dispatch(
            Actions.ChangeTargetURL({
                index: inputDataIndex,
                newURL: event.target.value as string,
            })
        );
        fetch('/api/checkjagtester', {
            method: HTTPMethods.POST,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                inputURL: event.target.value as string,
                method: inputsData[inputDataIndex].method,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(
                    Actions.ChangeTargetJagEnabled({
                        index: inputDataIndex,
                        isEnabled: data.jagtester as boolean,
                    })
                );
            })
            .catch(() => {
                dispatch(
                    Actions.ChangeTargetJagEnabled({
                        index: inputDataIndex,
                        isEnabled: false,
                    })
                );
            }); // TODO add better error handling
    };

    const handleChangePercentage = (index: number, event: unknown, newValue: number | number[]) => {
        if (inputsData.length !== 1) {
            dispatch(Actions.ChangeTargetPercent({ index, newValue: newValue as number }));
        }
    };

    const addTargetInput = () => {
        dispatch(Actions.AddTarget());
    };

    const deleteTarget = (index: number) => {
        dispatch(Actions.ChangeTargetPercent({ index, newValue: 0 }));
        dispatch(Actions.DeleteTarget(index));
    };

    const classes = useStyles();

    //---------------------------- menu items for all http methodss
    const menuItems: JSX.Element[] = [];
    for (const [, value] of Object.entries(HTTPMethods)) {
        menuItems.push(
            <MenuItem value={value} key={value}>
                {value}
            </MenuItem>
        );
    }

    //---------------------------- inputting all inputs into an array
    const inputsArr: JSX.Element[] = [];
    for (let i = 0; i < inputsData.length; i++) {
        inputsArr.push(
            <Container key={`input${i}`} className="mb-3">
                <Row>
                    <FormControl disabled={isTestRunning} className={classes.methodInput}>
                        <InputLabel id={`select-http-method-label-${i}`}>Method</InputLabel>
                        <Select
                            labelId={`select-http-method-label-${i}`}
                            id={`select-http-method-${i}`}
                            value={inputsData[i].method}
                            onChange={(e) => handleChangeMethod(i, e)}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.methodURL}>
                        <TextField
                            disabled={isTestRunning}
                            error={!inputsData[i].jagTesterEnabled}
                            id={`target-url-${i}`}
                            label={
                                'Target URL (localhost).' +
                                (inputsData[i].jagTesterEnabled ? '' : ' Jagtester not found')
                            }
                            variant="outlined"
                            defaultValue={inputsData[i].targetURL}
                            onChange={(e) => handleChangeURL(i, e)}
                        />
                    </FormControl>

                    {inputsData.length > 1 && (
                        <FormControl className="my-auto">
                            <DeleteIcon
                                color="action"
                                className={classes.deleteIcon}
                                onClick={() => !isTestRunning && deleteTarget(i)}
                            />
                        </FormControl>
                    )}
                </Row>
                <SingleSlider
                    text="Load percentage"
                    id={`load-percentage-${i}`}
                    key={`load-percentage-${i}`}
                    value={inputsData[i].percentage}
                    onChange={(e, newValue) => handleChangePercentage(i, e, newValue)}
                    min={0}
                    max={100}
                    step={1}
                    marks={{ interval: 10, min: 0, max: 100 }}
                    disabled={inputsData.length === 1 || isTestRunning}
                />
                <hr />
            </Container>
        );
    }

    // pushing a disabled input
    inputsArr.push(
        <Container key={`input${-1}`} className="mb-3 ">
            <Row>
                <FormControl disabled className={classes.methodInput}>
                    <InputLabel id={`select-http-method-label-${-1}`}>Method</InputLabel>
                    <Select
                        labelId={`select-http-method-label-${-1}`}
                        id={`select-http-method-${-1}`}
                        value={HTTPMethods.GET}
                    >
                        {menuItems}
                    </Select>
                </FormControl>
                <FormControl className={classes.methodURL}>
                    <TextField
                        disabled
                        id={`target-url-${-1}`}
                        label="Target URL (localhost)"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl disabled className="my-auto">
                    <AddCircleIcon
                        color="primary"
                        className={classes.addIcon}
                        onClick={addTargetInput}
                    />
                </FormControl>
            </Row>
        </Container>
    );

    return <Container className="m-0">{inputsArr}</Container>;
};

export default TartgetInputs;
