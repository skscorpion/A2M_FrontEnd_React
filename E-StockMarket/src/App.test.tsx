import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Router from './router';

const store = createStore(reducers);

test('renders learn react link', () => {
	const wrapped = shallow(
		<Provider store={store}>
			<App />
		</Provider>
	);
	// expect(wrapped.find(Router).length).toEqual(1);
	// const { getByText } = render(
	// <Provider store={store}>
	// 	<App />
	// </Provider>
	// );
	// console.log('linkElement*************************************');
	// const linkElement = getByText(/learn react/i);
	// console.log('linkElement', linkElement);
	// expect(linkElement).toBeNull(); // toBeInTheDocument();
});
