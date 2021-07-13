import reducer from '../companyReducer';

describe(`the companyReducer reducer`, () => {
	it(`should return the default state`, () => {
		const state = undefined;
		const action = {};
		const expectedOutput = {
			error: null,
			loading: false,
			companies: [],
			selectedCompany: {},
		};
		expect(reducer(state, action)).toEqual(expectedOutput);
	});
});
