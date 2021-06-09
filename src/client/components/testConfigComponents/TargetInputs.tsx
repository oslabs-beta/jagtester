import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import TargetInputSingle, { useStyles, menuItems } from './TargetInputSingle';

import { HTTPMethods } from '../../interfaces';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Actions from '../../state/actions/actions';
//---------------------------- will render single targets based on the state passed down from the parent
const TartgetInputs: () => JSX.Element = () => {
    const inputsData = useAppSelector((state) => state.inputsData);
    const dispatch = useAppDispatch();

    const addTargetInput = () => {
        dispatch(Actions.AddTarget());
    };

    const classes = useStyles();

    //---------------------------- inputting all inputs into an array
    const inputsArr: JSX.Element[] = [];
    for (let i = 0; i < inputsData.length; i++) {
        inputsArr.push(<TargetInputSingle index={i} key={i} />);
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
