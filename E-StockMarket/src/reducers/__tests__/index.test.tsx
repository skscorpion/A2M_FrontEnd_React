import index from '../index';
import authReducer from '../authReducer';
import companyReducer from '../companyReducer';

describe(`the index reducer`, () => {
	it(`should return the default state for both`, () => {
		const state = undefined;
		const action = {};
		const expectedOutput = {
			auth: { isSignedIn: null },
			company: {
				error: null,
				loading: false,
				companies: [],
				selectedCompany: {},
			},
		};
		expect(index(state, action)).toEqual(expectedOutput);
	});
});
