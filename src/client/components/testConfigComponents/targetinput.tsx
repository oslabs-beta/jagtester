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
            minWidth: '15%',
        },
        methodURL: {
            margin: theme.spacing(1),
            minWidth: '60%',
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
const TartgetInput: () => JSX.Element = () => {
    const [inputsData, setInputsData] = React.useState([
        {
            method: HTTPMethods.GET,
            targetURL: 'localhost:3000',
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

    const addTargetInput = () => {
        setInputsData([
            ...inputsData,
            {
                method: HTTPMethods.GET,
                targetURL: 'localhost:3000',
            },
        ]);
    };

    const deleteTarget = (i: number) => {
        const copiedState = lodash.cloneDeep(inputsData);
        copiedState.splice(i, 1);
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
            <Row className="mb-3 mx-auto" key={`input${i}`}>
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
                        <DeleteIcon color="secondary" className={classes.deleteIcon} onClick={() => deleteTarget(i)} />
                    </FormControl>
                )}
            </Row>
        );
    }

    // pushing a disabled input
    inputsArr.push(
        <Row className="mb-3 mx-auto" key={`input${-1}`}>
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
    );

    return <Container className="m-0">{inputsArr}</Container>;
};

export default TartgetInput;
