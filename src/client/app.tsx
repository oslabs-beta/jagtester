import React from 'react';
import HomePage from './pages/home';
import TestPage from './pages/testconfigpage';
import Navigation from './components/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App: () => JSX.Element = () => {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/test" exact component={TestPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
