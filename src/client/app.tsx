import React from 'react';
import TestPage from './pages/testconfigpage';
import ResultsPage from './pages/results';
import Navigation from './components/navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import socketIOClient from 'socket.io-client';

import { useAppDispatch } from './state/hooks';
import Actions from './state/actions/actions';

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

    // end  ----------------------------------- socket io funcitonality
    return (
        <div>
            <BrowserRouter>
                <Container fluid>
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={TestPage} />
                        <Route path="/results" exact component={ResultsPage} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
};

export default App;
