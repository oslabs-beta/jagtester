import { createAction } from '@reduxjs/toolkit';

enum ActionTypes {
    setValueRPS = 'setValueRPS',
    setValueStartEnd = 'setValueStartEnd',
    setValueSeconds = 'setValueSeconds',
    setIsTestRunning = 'setIsTestRunning',
    setCurRunningRPS = 'setCurRunningRPS',
    setInputsData = 'setInputsData',
}

const SetValueRPSAction = createAction<number[]>(ActionTypes.setValueRPS);
const SetValueStartEndAction = createAction<number[]>(ActionTypes.setValueStartEnd);
const SetValueSecondsAction = createAction<number[]>(ActionTypes.setValueSeconds);
const SetIsTestRunningAction = createAction<boolean>(ActionTypes.setIsTestRunning);
const SetCurRunningRPSAction = createAction<number>(ActionTypes.setCurRunningRPS);
//TODO add createACtion for SetCurRunningRPSAction

const Actions = {
    SetValueRPSAction,
    SetValueStartEndAction,
    SetValueSecondsAction,
    SetIsTestRunningAction,
    SetCurRunningRPSAction,
    // TODO export SetCurRunningRPSAction
};

export default Actions;
