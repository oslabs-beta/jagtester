// react imports
import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

//material ui imports
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//custom component imports
import SingleSlider from './SingleSlider';

// redux hooks
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
//custom interfaces
import { HTTPMethods } from '../../interfaces';

//---------------------------- menu items for all http methodss
const menuItems: JSX.Element[] = [];
for (const [, value] of Object.entries(HTTPMethods)) {
    menuItems.push(
        <MenuItem value={value} key={value}>
            {value}
        </MenuItem>
    );
}

const TargetInputSingle: (props: { index: number }) => JSX.Element = ({ index }) => {
    const i = index;
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const inputsData = useAppSelector((state) => state.inputsData);
    const dispatch = useAppDispatch();

    const classes = useStyles();

    const handleChangePercentage = (index: number, event: unknown, newValue: number | number[]) => {
        if (inputsData.length !== 1) {
            dispatch(Actions.ChangeTargetPercent({ index, newValue: newValue as number }));
        }
    };
    const deleteTarget = (index: number) => {
        dispatch(Actions.ChangeTargetPercent({ index, newValue: 0 }));
        dispatch(Actions.DeleteTarget(index));
    };
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
            });
    };

    return (
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
                extraLabel={`${inputsData[i].percentage}%`}
            />
            <hr />
        </Container>
    );
};

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
                color: '#2c3b8f',
            },
        },
        deleteIcon: {
            fontSize: '3rem',
            '&:hover': {
                color: '#c20045',
            },
        },
    })
);

const TargetInputDisabled: () => JSX.Element = () => {
    const isTestRunning = useAppSelector((state) => state.isTestRunning);
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const addTargetInput = () => {
        dispatch(Actions.AddTarget());
    };
    return (
        <Container key={`input${-1}`} className="mx-0 my-2 p-0">
            <Row className="p-0">
                <FormControl disabled className={classes.methodInput}>
                    <InputLabel>Method</InputLabel>
                    <Select value={HTTPMethods.GET}>{menuItems}</Select>
                </FormControl>
                <FormControl className={classes.methodURL}>
                    <TextField disabled label="Target URL (localhost)" variant="outlined" />
                </FormControl>
                <FormControl disabled className="my-auto">
                    <AddCircleIcon
                        color="primary"
                        className={classes.addIcon}
                        onClick={isTestRunning ? undefined : addTargetInput}
                    />
                </FormControl>
            </Row>
        </Container>
    );
};

export default TargetInputSingle;
export { TargetInputDisabled };
