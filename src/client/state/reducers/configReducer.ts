import Actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

import { HTTPMethods, AllPulledDataFromTest } from '../../interfaces';

const initialState: {
    valueRPS: number;
    valueStart: number;
    valueEnd: number;
    valueSeconds: number;
    isTestRunning: boolean;
    curRunningRPS: number;
    inputsData: {
        method: HTTPMethods;
        targetURL: string;
        percentage: number;
        jagTesterEnabled: boolean;
    }[];
    receivedData: AllPulledDataFromTest[];
    darkMode: boolean;
} = {
    valueRPS: 500,
    valueStart: 100,
    valueEnd: 600,
    valueSeconds: 1,
    isTestRunning: false,
    curRunningRPS: 0,
    inputsData: [
        {
            method: HTTPMethods.GET,
            targetURL: 'http://localhost:3030',
            percentage: 20,
            jagTesterEnabled: false,
        },
        {
            method: HTTPMethods.GET,
            targetURL: 'http://localhost:3030/testroute',
            percentage: 80,
            jagTesterEnabled: false,
        },
    ],
    receivedData: [],
    darkMode: false,
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
        })
        .addCase(Actions.ChangeTargetMethod, (state, action) => {
            state.inputsData[action.payload.index].method = action.payload.method;
        })
        .addCase(Actions.ChangeTargetURL, (state, action) => {
            state.inputsData[action.payload.index].targetURL = action.payload.newURL;
        })
        .addCase(Actions.ChangeTargetJagEnabled, (state, action) => {
            state.inputsData[action.payload.index].jagTesterEnabled = action.payload.isEnabled;
        })
        .addCase(Actions.ChangeTargetPercent, (state, action) => {
            let index = action.payload.index;
            const newValue = action.payload.newValue;
            // state.inputsData[index - 1].percentage = newValue;
            // state.inputsData[index].percentage = 100 - newValue;
            let diffWithNext = state.inputsData[index].percentage - newValue;
            const diffWithNextCopy = diffWithNext;
            while (diffWithNext !== 0) {
                //TODO add a better terminating condition
                index = index < state.inputsData.length - 1 ? index + 1 : 0;

                if (state.inputsData[index].percentage + diffWithNext > 100) {
                    diffWithNext = diffWithNext - (100 - state.inputsData[index].percentage);
                    state.inputsData[index].percentage = 100;
                } else if (state.inputsData[index].percentage + diffWithNext < 0) {
                    diffWithNext = state.inputsData[index].percentage + diffWithNext;
                    state.inputsData[index].percentage = 0;
                } else {
                    state.inputsData[index].percentage =
                        state.inputsData[index].percentage + diffWithNext;
                    break;
                }
            }
            state.inputsData[action.payload.index].percentage -= diffWithNextCopy;
        })
        .addCase(Actions.AddTarget, (state) => {
            state.inputsData.push({
                method: HTTPMethods.GET,
                targetURL: '',
                percentage: 0,
                jagTesterEnabled: false,
            });
            const percentagePerInput = Math.floor(100 / state.inputsData.length);
            for (let i = 0; i < state.inputsData.length; i++) {
                state.inputsData[i].percentage = percentagePerInput;
            }
            if (state.inputsData.length > 0)
                state.inputsData[0].percentage +=
                    100 - state.inputsData.length * percentagePerInput;
        })
        .addCase(Actions.DeleteTarget, (state, action) => {
            state.inputsData.splice(action.payload, 1);
        })
        .addCase(Actions.SetReceivedData, (state, action) => {
            state.receivedData = action.payload;
        }).addCase(Actions.SwitchDarkMode, (state, action) => {
            state.darkMode = action.payload;
        })
});

export default configReducer;
