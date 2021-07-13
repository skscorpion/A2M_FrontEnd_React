import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import reducers from './reducers';

export default ({ children, initialState = {} }: any) => {
	const store = createStore(reducers, initialState, applyMiddleware());

	return <Provider store={store}>{children}</Provider>;
};
