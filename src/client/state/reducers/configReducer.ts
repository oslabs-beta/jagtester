import Actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

import { HTTPMethods } from '../../interfaces';

import { initialState } from './initialState';

const calculateTotalTestPercent = (
	valueRPS: number,
	valueStart: number,
	valueEnd: number,
	curRunningRPS: number,
	curRPSpercent: number
) => {
	const range = (valueEnd - valueStart) / valueRPS;

	return curRunningRPS === 0
		? Math.round((100 * curRPSpercent) / (range + 1))
		: Math.round(
				(100 * ((curRunningRPS - valueStart) / valueRPS + 1 + curRPSpercent)) / (range + 1)
		  );
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
			if (state.valueEnd < 10000 && action.payload > 10000) {
				state.highRPSwarning = true;
			}
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
			state.curTestTotalPercent = calculateTotalTestPercent(
				state.valueRPS,
				state.valueStart,
				state.valueEnd,
				state.curRunningRPS,
				state.curRPSpercent
			);
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
			let diffWithNext = state.inputsData[index].percentage - newValue;
			const diffWithNextCopy = diffWithNext;
			while (diffWithNext !== 0) {
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
			state.receivedData.push(...action.payload);
		})
		.addCase(Actions.DeleteReceivedData, (state) => {
			state.receivedData = [];
		})
		.addCase(Actions.SetShowModal, (s, a) => {
			s.showModal = a.payload;
		})
		.addCase(Actions.SetModalError, (state, action) => {
			state.modalError = action.payload;
		})
		.addCase(Actions.DeleteSingleData, (state, action) => {
			state.receivedData.splice(action.payload, 1);
		})
		.addCase(Actions.SetResultsTabValue, (state, action) => {
			state.resultsTabValue = Math.max(
				Math.min(action.payload, state.receivedData.length - 1),
				0
			);
		})
		.addCase(Actions.SetCurRPSpercent, (state, action) => {
			state.curRPSpercent = action.payload;
			state.curTestTotalPercent = calculateTotalTestPercent(
				state.valueRPS,
				state.valueStart,
				state.valueEnd,
				state.curRunningRPS,
				state.curRPSpercent
			);
		})
		.addCase(Actions.SetCurTestStartTime, (state, action) => {
			state.curTestStartTime = action.payload;
		})
		.addCase(Actions.SetDarkMode, (state, action) => {
			state.darkMode = action.payload;
		})
		.addCase(Actions.ResetState, (state) => {
			state.valueRPS = initialState.valueRPS;
			state.valueStart = initialState.valueStart;
			state.valueEnd = initialState.valueEnd;
			state.valueSeconds = initialState.valueSeconds;
			state.isTestRunning = initialState.isTestRunning;
			state.curRunningRPS = initialState.curRunningRPS;
			state.showModal = initialState.showModal;
			state.modalError = initialState.modalError;
			state.resultsTabValue = initialState.resultsTabValue;
			state.curRPSpercent = initialState.curRPSpercent;
			state.curTestTotalPercent = initialState.curTestTotalPercent;
			state.curTestStartTime = initialState.curTestStartTime;
			state.highRPSwarning = initialState.highRPSwarning;
			state.stoppingSpinner = initialState.stoppingSpinner;
		})
		.addCase(Actions.SetHighRPSwarning, (state, action) => {
			state.highRPSwarning = action.payload;
		})
		.addCase(Actions.SetStoppingSpinner, (state, action) => {
			state.stoppingSpinner = action.payload;
		});
});

export default configReducer;
