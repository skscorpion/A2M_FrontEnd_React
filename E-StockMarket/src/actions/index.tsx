import {
	SIGN_IN,
	SIGN_OUT,
	ADD_COMPANY,
	SELECTED_COMPANY,
	FETCH_COMPANY,
	SET_COMPANIES,
} from './types';
import axios from 'axios';

export const signIn = () => {
	return {
		type: SIGN_IN,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const addCompany = (Company: any) => {
	return {
		type: ADD_COMPANY,
		Company,
	};
};

export const fetchCompanies = () => {
	const promise = axios.get('https://localhost:5001/Company/Companies');
	return {
		type: FETCH_COMPANY,
		payload: promise,
	};
};

export const selectedCompany = (code: string) => {
	return {
		type: SELECTED_COMPANY,
		code,
	};
};

export const setCompanies = (companies: any) => {
	return {
		type: SET_COMPANIES,
		companies,
	};
};

export const Companies = () => {
	return {
		type: FETCH_COMPANY,
	};
};
