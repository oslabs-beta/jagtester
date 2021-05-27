import React from 'react';
import fakeserver from './fakeserver';
// import ReactDOM from 'react-dom';

const App = (): JSX.Element => {
    fakeserver();
    return (
        <div>
            <h1>My React and TypeScript App!</h1>
        </div>
    );
};

export default App;
