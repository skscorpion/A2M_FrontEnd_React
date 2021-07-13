import reducer from '../authReducer';

describe(`the authReducer reducer`, () => {
	it(`should return the default state`, () => {
		const state = undefined;
		const action = {};
		const expectedOutput = { isSignedIn: null };
		expect(reducer(state, action)).toEqual(expectedOutput);
	});
});
