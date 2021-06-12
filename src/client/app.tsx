import React from 'react';
import TestPage from './pages/testconfigpage';
import ResultsPage from './pages/results';
import Navigation from './components/navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AllPulledDataFromTest } from './interfaces';
import socketIOClient from 'socket.io-client';
import { useAppDispatch } from './state/hooks';
import Actions from './state/actions/actions';
import Modal from './components/modal';

const App: () => JSX.Element = () => {
    const socket = socketIOClient();
    const dispatch = useAppDispatch();

    // start----------------------------------- socket io funcitonality
    socket.on('singleRPSfinished', (rps: number) => {
        dispatch(Actions.SetCurRunningRPS(rps));
    });
    socket.on('testRunningStateChange', (isTestRunning: boolean) => {
        dispatch(Actions.SetIsTestRunning(isTestRunning));
    });
    socket.on('allRPSfinished', (allPulledDataFromTest: AllPulledDataFromTest[]) => {
        dispatch(Actions.SetReceivedData(allPulledDataFromTest));
    });
    socket.on('errorInfo', (errName: string) => {
        dispatch(Actions.SetShowModal(true));
        dispatch(Actions.SetModalError(errName));
    });

    // end  ----------------------------------- socket io funcitonality
    return (
        <div>
            <BrowserRouter>
                <Container fluid className="mx-0 px-0">
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={TestPage} />
                        <Route path="/results" exact component={ResultsPage} />
                    </Switch>
                    <Modal />
                </Container>
            </BrowserRouter>
        </div>
    );
};

export default App;
