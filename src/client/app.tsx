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
import {ioSocketCommands} from '../client/interfaces';

const App: () => JSX.Element = () => {
    const socket = socketIOClient();
    const dispatch = useAppDispatch();

    // start----------------------------------- socket io funcitonality
    socket.on(ioSocketCommands.singleRPSfinished.toString(), (rps: number) => {
        dispatch(Actions.SetCurRunningRPS(rps));
        dispatch(Actions.SetCurRPSpercent(0));
    });
    socket.on(ioSocketCommands.testRunningStateChange.toString(), (isTestRunning: boolean) => {
        dispatch(Actions.SetIsTestRunning(isTestRunning));
    });
    socket.on(ioSocketCommands.allRPSfinished.toString(), (allPulledDataFromTest: AllPulledDataFromTest[]) => {
        dispatch(Actions.SetReceivedData(allPulledDataFromTest));
    });
    socket.on(ioSocketCommands.errorInfo.toString(), (errName: string) => {
        dispatch(Actions.SetShowModal(true));
        dispatch(Actions.SetModalError(errName));
    });
    socket.on(ioSocketCommands.currentRPSProgress.toString(), (percent: number) => {
        dispatch(Actions.SetCurRPSpercent(percent));
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
