import React from 'react';
import Container from 'react-bootstrap/Container';

import TargetInputSingle, { TargetInputDisabled } from './TargetInputSingle';

import { useAppSelector } from '../../state/hooks';
//---------------------------- will render single targets based on the state passed down from the parent
const TartgetInputs: () => JSX.Element = () => {
    const inputsData = useAppSelector((state) => state.inputsData);

    //---------------------------- inputting all inputs into an array
    const inputsArr: JSX.Element[] = [];
    for (let i = 0; i < inputsData.length; i++) {
        inputsArr.push(<TargetInputSingle index={i} key={i} />);
    }
    // pushing a disabled input
    inputsArr.push(<TargetInputDisabled key={-1} />);

    return <Container className="m-0">{inputsArr}</Container>;
};

export default TartgetInputs;
