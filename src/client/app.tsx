import React, { useEffect } from 'react';
import TestPage from './pages/testconfigpage';
import ResultsPage from './pages/results';
import Navigation from './components/navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AllPulledDataFromTest } from './interfaces';
import socketIOClient from 'socket.io-client';
import { useAppDispatch, useAppSelector } from './state/hooks';
import Actions from './state/actions/actions';
import Modal from './components/modal';
import { ioSocketCommands } from '../client/interfaces';

//MUI imports
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: () => JSX.Element = () => {
	const dispatch = useAppDispatch();

	const prefersDarkMode = useAppSelector((state) => state.darkMode);

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);

	useEffect(() => {
		if (process.env.JAG !== 'demo') {
			const socket = socketIOClient();
			// start----------------------------------- socket io funcitonality
			socket.on(ioSocketCommands.singleRPSfinished, (rps: number) => {
				dispatch(Actions.SetCurRunningRPS(rps));
				dispatch(Actions.SetCurRPSpercent(0));
			});
			socket.on(ioSocketCommands.testRunningStateChange, (isTestRunning: boolean) => {
				dispatch(Actions.SetIsTestRunning(isTestRunning));
			});
			socket.on(
				ioSocketCommands.allRPSfinished,
				(allPulledDataFromTest: AllPulledDataFromTest[]) => {
					dispatch(Actions.SetReceivedData(allPulledDataFromTest));
				}
			);
			socket.on(ioSocketCommands.errorInfo, (errName: string) => {
				dispatch(Actions.SetShowModal(true));
				dispatch(Actions.SetModalError(errName));
			});
			socket.on(ioSocketCommands.currentRPSProgress, (percent: number) => {
				dispatch(Actions.SetCurRPSpercent(percent));
			});

			return function cleanup() {
				socket.off(ioSocketCommands.singleRPSfinished);
				socket.off(ioSocketCommands.testRunningStateChange);
				socket.off(ioSocketCommands.allRPSfinished);
				socket.off(ioSocketCommands.errorInfo);
				socket.off(ioSocketCommands.currentRPSProgress);
			};
		}
	}, [dispatch]);

	// end  ----------------------------------- socket io funcitonality
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<BrowserRouter>
				<Container fluid className="mx-0 px-0">
					<Navigation />
					<Switch>
						<Route path={['/', '/demo']} exact component={TestPage} />
						<Route path="/results" exact component={ResultsPage} />
					</Switch>
					<Modal />
				</Container>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
