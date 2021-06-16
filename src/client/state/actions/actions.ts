import { createAction } from '@reduxjs/toolkit';

import { HTTPMethods, AllPulledDataFromTest } from '../../interfaces';

enum ActionTypes {
    setValueRPS = 'setValueRPS',
    setValueStart = 'setValueStart',
    setValueEnd = 'setValueEnd',
    setValueSeconds = 'setValueSeconds',
    setIsTestRunning = 'setIsTestRunning',
    setCurRunningRPS = 'setCurRunningRPS',

    changeTargetMethod = 'changeTargetMethod',
    changeTargetURL = 'changeTargetURL',
    changeTargetJagEnabled = 'changeTargetJagEnabled',
    changeTargetPercent = 'changeTargetPercent',
    addTarget = 'addTarget',
    deleteTarget = 'deleteTarget',

    setReceivedData = 'setRedeceivedData',
    deleteReceivedData = 'deleteReceivedData',

    setShowModal = 'setShowModal',
    setModalError = 'setModalError',

    deleteSingleData = 'deleteSingleData',
    setResultsTabValue = 'setResultsTabValue',
    setCurRPSpercent = 'setCurRPSpercent',

    setCurTestStartTime = 'setCurTestStartTime',
    setDarkMode = 'setDarkMode',
    resetState = 'resetState',
    setHighRPSwarning = 'setHighRPSwarning',
    setStoppingSpinner = 'setStoppingSpinner',
}

const SetValueRPS = createAction<number>(ActionTypes.setValueRPS);
const SetValueStart = createAction<number>(ActionTypes.setValueStart);
const SetValueEnd = createAction<number>(ActionTypes.setValueEnd);
const SetValueSeconds = createAction<number>(ActionTypes.setValueSeconds);
const SetIsTestRunning = createAction<boolean>(ActionTypes.setIsTestRunning);
const SetCurRunningRPS = createAction<number>(ActionTypes.setCurRunningRPS);
const ChangeTargetMethod = createAction<{ index: number; method: HTTPMethods }>(
    ActionTypes.changeTargetMethod
);
const ChangeTargetURL = createAction<{ index: number; newURL: string }>(
    ActionTypes.changeTargetURL
);
const ChangeTargetJagEnabled = createAction<{ index: number; isEnabled: boolean }>(
    ActionTypes.changeTargetJagEnabled
);
const ChangeTargetPercent = createAction<{ index: number; newValue: number }>(
    ActionTypes.changeTargetPercent
);
const AddTarget = createAction(ActionTypes.addTarget);
const DeleteTarget = createAction<number>(ActionTypes.deleteTarget);

const SetReceivedData = createAction<AllPulledDataFromTest[]>(ActionTypes.setReceivedData);
const DeleteReceivedData = createAction(ActionTypes.deleteReceivedData);

const SetShowModal = createAction<boolean>(ActionTypes.setShowModal);
const SetModalError = createAction<string>(ActionTypes.setModalError);
const DeleteSingleData = createAction<number>(ActionTypes.deleteSingleData);
const SetResultsTabValue = createAction<number>(ActionTypes.setResultsTabValue);
const SetCurRPSpercent = createAction<number>(ActionTypes.setCurRPSpercent);
const SetCurTestStartTime = createAction<number>(ActionTypes.setCurTestStartTime);
const SetDarkMode = createAction<boolean>(ActionTypes.setDarkMode);
const ResetState = createAction(ActionTypes.resetState);
const SetHighRPSwarning = createAction<boolean>(ActionTypes.setHighRPSwarning);
const SetStoppingSpinner = createAction<boolean>(ActionTypes.setStoppingSpinner);

const Actions = {
    SetValueRPS,
    SetValueStart,
    SetValueEnd,
    SetValueSeconds,
    SetIsTestRunning,
    SetCurRunningRPS,
    ChangeTargetMethod,
    ChangeTargetURL,
    ChangeTargetJagEnabled,
    ChangeTargetPercent,
    AddTarget,
    DeleteTarget,
    SetReceivedData,
    SetShowModal,
    SetModalError,
    DeleteSingleData,
    SetResultsTabValue,
    SetCurRPSpercent,
    SetCurTestStartTime,
    SetDarkMode,
    ResetState,
    DeleteReceivedData,
    SetHighRPSwarning,
    SetStoppingSpinner,
};

export default Actions;
