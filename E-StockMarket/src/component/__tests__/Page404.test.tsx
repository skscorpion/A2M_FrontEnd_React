import React from 'react';
import { render } from '@testing-library/react';
import Page404 from '../Page404';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {
	Box,
	Grid,
	Link,
	Checkbox,
	FormControlLabel,
	TextField,
	CssBaseline,
	Button,
	Avatar,
	Container,
	makeStyles,
} from '@material-ui/core';
const store = createStore(reducers);

test('renders learn react link', () => {
	const wrapped = shallow(<Page404 />);
});
