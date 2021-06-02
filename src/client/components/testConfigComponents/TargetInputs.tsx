import lodash from 'lodash';

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

//---------------------------- suppoerted http methods
const HTTPMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    HEAD: 'HEAD',
    CONNECT: 'CONNECT',
    TRACE: 'TRACE',
};

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
    const [inputsData, setInputsData] = React.useState([
        {
            method: HTTPMethods.GET,
            targetURL: 'localhost:3000',
            percentage: [100],
        },
    ]);

    const handleChangeMethod = (inputDataIndex: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const copiedState = lodash.cloneDeep(inputsData);
        copiedState[inputDataIndex].method = event.target.value as string;
        setInputsData(copiedState);
    };

    const handleChangeURL = (inputDataIndex: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const copiedState = lodash.cloneDeep(inputsData);
        copiedState[inputDataIndex].targetURL = event.target.value as string;
        setInputsData(copiedState);
    };

    const percentageHelper = (index: number, newValue: number | number[]) => {
        const copiedState = lodash.cloneDeep(inputsData);

        let diffWithNext = copiedState[index].percentage[0] - (newValue as number[])[0];
        const diffWithNextCopy = diffWithNext;
        const cur = copiedState[index].percentage;
        while (diffWithNext !== 0) {
            index = index < copiedState.length - 1 ? index + 1 : 0;
            const next = copiedState[index].percentage;

            if (next[0] + diffWithNext > 100) {
                diffWithNext = diffWithNext - (100 - next[0]);
                next[0] = 100;
            } else if (next[0] + diffWithNext < 0) {
                diffWithNext = next[0] + diffWithNext;
                next[0] = 0;
            } else {
                next[0] = next[0] + diffWithNext;
                break;
            }
        }
        cur[0] = cur[0] - diffWithNextCopy;
        return copiedState;
    };

    const handleChangePercentage = (index: number, event: unknown, newValue: number | number[]) => {
        if (inputsData.length !== 1) {
            setInputsData(percentageHelper(index, newValue));
        }
    };

    const addTargetInput = () => {
        setInputsData([
            ...inputsData,
            {
                method: HTTPMethods.GET,
                targetURL: '',
                percentage: [0],
            },
        ]);
    };

    const deleteTarget = (index: number) => {
        const copiedState = percentageHelper(index, [0]);
        copiedState.splice(index, 1);
        setInputsData(copiedState);
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
                    <FormControl className={classes.methodInput}>
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
                            id={`target-url-${i}`}
                            label="Target URL (localhost)"
                            variant="outlined"
                            value={inputsData[i].targetURL}
                            onChange={(e) => handleChangeURL(i, e)}
                        />
                    </FormControl>

                    {inputsData.length > 1 && (
                        <FormControl className="my-auto">
                            <DeleteIcon color="action" className={classes.deleteIcon} onClick={() => deleteTarget(i)} />
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
                    step={5}
                    marks={{ interval: 10, min: 0, max: 100 }}
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
                    <TextField disabled id={`target-url-${-1}`} label="Target URL (localhost)" variant="outlined" />
                </FormControl>
                <FormControl disabled className="my-auto">
                    <AddCircleIcon color="primary" className={classes.addIcon} onClick={addTargetInput} />
                </FormControl>
            </Row>
        </Container>
    );

    return <Container className="m-0">{inputsArr}</Container>;
};

export default TartgetInputs;
