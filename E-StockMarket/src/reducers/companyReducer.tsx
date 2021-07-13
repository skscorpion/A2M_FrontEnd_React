import {
	ADD_COMPANY,
	SELECTED_COMPANY,
	FETCH_COMPANY,
	FETCH_COMPANY_ERROR,
	SET_COMPANIES,
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	companies: [],
	selectedCompany: {},
	error: null,
};

export default (state: any = INITIAL_STATE, action: any) => {
	console.log('action',action)
	switch (action.type) {
		case ADD_COMPANY:
			return { ...state };
		case SELECTED_COMPANY:
			console.log('state',state)
			let company: any;
			if (action.code) {
				company = state.companies.find(
					(p: any) => p.code === action.code
				);
			} else {
				company = null;
			}
			return { ...state, selectedCompany: company };
		case FETCH_COMPANY:
			return {
				...state,
				companies: action.companies,
				loading: false,
			};
		case FETCH_COMPANY_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case SET_COMPANIES:
			return { ...state, companies: action.companies };
		default:
			return state;
	}
};
