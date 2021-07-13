import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Login';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
// import action from '../../actions';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
// import { storeFactory } from '../../test/testUtils';

const mockStore = configureStore([]);
const store = createStore(reducers);

const setup = (initialState: any = {}) => {
	// const store = storeFactory(initialState);
	const wrapper = shallow(<Login store={store} />).dive();
	return wrapper;
};

describe('Login component- input fields', () => {
	let wrapper;

	beforeEach(() => {
		const initialState = {};
		wrapper = setup(initialState);
		moxios.install();
		moxios.stubRequest('http://localhost:5000/Auth?username=admin', {
			status: 200,
			response: { jwt: 'klfsjfkljsd' },
		});
	});

	afterEach(() => {
		moxios.uninstall();
	});
	it('username field should be there', () => {
		wrapper = setup();
		const component = wrapper.find('#username');
		expect(component).toHaveLength(1);
	});

	it('password field should be there', () => {
		wrapper = setup();
		const component = wrapper.find('#password');
		expect(component).toHaveLength(1);
	});

	it('signin button should be there', () => {
		wrapper = setup();
		const component = wrapper.find('[type="submit"]');
		expect(component).toHaveLength(1);
	});

	test('form submit', () => {
		wrapper = setup();
		const obj = {
			call() {
				console.log('testfkjdsl');
			},
		};
		const fakeEvent = { preventDefault: () => console.log('preventDefault') };

		const event = {
			preventDefault() {},
		};
		const onSubmitSpy = jest.fn();

		const component = shallow(
			<Login store={store} onSubmit={onSubmitSpy} />
		).dive();
		component.find('[type="submit"]').simulate('click');
		expect(component.find('form').length).toBe(1);
	});
});
