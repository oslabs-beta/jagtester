import { createAction } from '@reduxjs/toolkit';

enum ActionTypes {
    setValueRPS = 'setValueRPS',
    // setValueStartEnd = 'setValueStartEnd',
    setValueStart = 'setValueStart',
    setValueEnd = 'setValueEnd',
    setValueSeconds = 'setValueSeconds',
    setIsTestRunning = 'setIsTestRunning',
    setCurRunningRPS = 'setCurRunningRPS',
    setInputsData = 'setInputsData',
}

const SetValueRPS = createAction<number>(ActionTypes.setValueRPS);
// const SetValueStartEnd = createAction<number[]>(ActionTypes.setValueStartEnd);
const SetValueStart = createAction<number>(ActionTypes.setValueStart);
const SetValueEnd = createAction<number>(ActionTypes.setValueEnd);
const SetValueSeconds = createAction<number>(ActionTypes.setValueSeconds);
const SetIsTestRunning = createAction<boolean>(ActionTypes.setIsTestRunning);
const SetCurRunningRPS = createAction<number>(ActionTypes.setCurRunningRPS);
//TODO add createACtion for SetCurRunningRPSAction

const Actions = {
    SetValueRPS,
    // SetValueStartEnd,
    SetValueStart,
    SetValueEnd,
    SetValueSeconds,
    SetIsTestRunning,
    SetCurRunningRPS,
    // TODO export SetCurRunningRPSAction
};

export default Actions;
