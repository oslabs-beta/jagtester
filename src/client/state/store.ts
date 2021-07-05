import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers/configReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, configReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

const storeNoPersist = configureStore({
	reducer: configReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default process.env.JAG === 'demo' ? storeNoPersist : store;
