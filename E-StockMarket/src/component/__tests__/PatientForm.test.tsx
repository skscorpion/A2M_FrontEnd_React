import React from 'react';
import { render } from '@testing-library/react';
import CompanyForm from '../form/CompanyForm';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
// import action from '../../actions';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
// import storeFactory from '../../test/testUtils';

const mockStore = configureStore([]);
// const store = createStore(reducers);
const storeFactory = (initialState: any) => {
	return createStore(reducers, initialState);
};

const setup = (initialState: any = { auth: {}, company: {} }) => {
	const store = storeFactory(initialState);
	const prop = {
		isAuthenticate: true,
		history: {},
		match: { path: { replace() {} } },
	};
	const wrapper = mount(
		<Provider store={store}>
			<CompanyForm {...prop} />
		</Provider>
	);
	return wrapper;
};

describe('Company Form component', () => {
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

	describe('required company fields should be present in the form', () => {
		it('firstname field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="firstName"]');
			expect(component).toBeTruthy();
		});

		it('surName field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="surName"]');
			expect(component).toBeTruthy();
		});

		it('phone field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="phone"]');
			expect(component).toBeTruthy();
		});

		it('email field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="email"]');
			expect(component).toBeTruthy();
		});

		it('address field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="address"]');
			expect(component).toBeTruthy();
		});

		it('gender field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="gender"]');
			expect(component).toBeTruthy();
		});

		it('dob field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="dob"]');
			expect(component).toBeTruthy();
		});

		it('maritalStatus field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="maritalStatus"]');
			expect(component).toBeTruthy();
		});

		it('religion field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="religion"]');
			expect(component).toBeTruthy();
		});

		it('nationality field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="nationality"]');
			expect(component).toBeTruthy();
		});

		it('occupation field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="occupation"]');
			expect(component).toBeTruthy();
		});
		it('state field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="state"]');
			expect(component).toBeTruthy();
		});

		it('age field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="age"]');
			expect(component).toBeTruthy();
		});

		it('kinName field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="kinName"]');
			expect(component).toBeTruthy();
		});

		it('kinAddress field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="kinAddress"]');
			expect(component).toBeTruthy();
		});

		it('kiinPhone field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="kiinPhone"]');
			expect(component).toBeTruthy();
		});

		it('kinEmail field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="kinEmail"]');
			expect(component).toBeTruthy();
		});

		it('field should be there', () => {
			wrapper = setup();
			const component = wrapper.find('[name="kinEmail"]');
			expect(component).toBeTruthy();
		});
	});
});
