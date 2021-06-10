import { createAction } from '@reduxjs/toolkit';

import { HTTPMethods } from '../../interfaces';

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
};

export default Actions;
