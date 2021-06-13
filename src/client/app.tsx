import React, { useState } from 'react';
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
import { useAppSelector } from './state/hooks';
import { dark } from '@material-ui/core/styles/createPalette';
import './styles.css'

const App: () => JSX.Element = () => {
    const socket = socketIOClient();
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState('');

    const darkMode = useAppSelector((state) => state.darkMode);
    const darkModeTheme = darkMode;


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
        setShowModal(true);
        setModalError(errName);
    });

    // end  ----------------------------------- socket io funcitonality
    return (
        <div className="App" data-theme={darkMode ? "dark" : "dark"}
    
         >
            <BrowserRouter>
                <Container fluid className="mx-0 px-0">
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={TestPage} />
                        <Route path="/results" exact component={ResultsPage} />
                    </Switch>
                    <Modal showModal={showModal} setShowModal={setShowModal} error={modalError} />
                </Container>
            </BrowserRouter>
        </div>
    );
};

export default App;
