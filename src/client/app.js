import React from 'react';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';

 function Navigation(props) {
    return (
      <nav className="navbar">
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink exact to="/test">Test Page</NavLink></li>
        </ul>
      </nav>
    );
  }

const App = props => {
    return(
        <div>           
            <Router>
            <Navigation />
                <Switch>
                    <Route path="/" exact component ={HomePage} /> 
                    <Route path="/test" exact component ={TestPage} /> 
                </Switch>
            </Router>
        </div>
    );
};

export default App;
