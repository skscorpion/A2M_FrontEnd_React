import { createStore } from 'redux';
import reducers from '../reducers';

const storeFactory = (initialState: any) => {
	return createStore(reducers, initialState);
};

export default storeFactory;
