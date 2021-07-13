import { combineReducers } from 'redux';
import authReducer from './authReducer';
import companyReducer from './companyReducer';

export default combineReducers({
	auth: authReducer,
	company: companyReducer,
});
