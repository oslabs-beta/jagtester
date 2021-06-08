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
    valueRPS: [500],
    valueStartEnd: [100, 100],
    valueSeconds: [1],
    isTestRunning: false,
    curRunningRPS: 0,
    //TODO add intial state for inputsdata
};

const configReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Actions.SetValueRPSAction, (state, action) => {
            state.valueRPS = action.payload;
        })
        .addCase(Actions.SetValueStartEndAction, (state, action) => {
            state.valueStartEnd = action.payload;
        })
        .addCase(Actions.SetValueSecondsAction, (state, action) => {
            state.valueSeconds = action.payload;
        })
        .addCase(Actions.SetIsTestRunningAction, (state, action) => {
            state.isTestRunning = action.payload;
        })
        .addCase(Actions.SetCurRunningRPSAction, (state, action) => {
            state.curRunningRPS = action.payload;
        });
    //TODO add case for inputsdata
});

export default configReducer;
