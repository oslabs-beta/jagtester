import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		{process.env.JAG === 'demo' ? (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		) : (
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		)}
	</Provider>,
	document.getElementById('root')
);
