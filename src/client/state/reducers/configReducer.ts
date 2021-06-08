import Actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

/**
 * 
const Actions = {
    SetValueRPSAction,
    SetValueStartEndAction,
    SetValueSecondsAction,
    SetIsTestRunningAction,
    SetCurRunningRPSAction,
    // TODO export SetCurRunningRPSAction
};
 */
// import type { RootState, AppDispatch } from '../store';
const initialState = {
    valueRPS: 500,
    valueStart: 100,
    valueEnd: 600,
    valueSeconds: 1,
    isTestRunning: false,
    curRunningRPS: 0,
    //TODO add intial state for inputsdata
};

const configReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Actions.SetValueRPS, (state, action) => {
            state.valueRPS = action.payload;
        })
        .addCase(Actions.SetValueStart, (state, action) => {
            state.valueStart = action.payload;
        })
        .addCase(Actions.SetValueEnd, (state, action) => {
            state.valueEnd = action.payload;
        })
        .addCase(Actions.SetValueSeconds, (state, action) => {
            state.valueSeconds = action.payload;
        })
        .addCase(Actions.SetIsTestRunning, (state, action) => {
            state.isTestRunning = action.payload;
        })
        .addCase(Actions.SetCurRunningRPS, (state, action) => {
            state.curRunningRPS = action.payload;
        });
    //TODO add case for inputsdata
});

export default configReducer;
