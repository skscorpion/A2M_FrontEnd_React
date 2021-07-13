import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import {
	TextField,
	Checkbox,
	Select,
	MenuItem,
	Switch,
	RadioGroup,
	FormControlLabel,
	ThemeProvider,
	Radio,
	createMuiTheme,
} from '@material-ui/core';
import _ from 'lodash/fp';

import { IProps } from './form-types';

const Field = ({
	label,
	name,
	type,
	control = {},
	validation = {},
	register,
	errors,
	options = [],
}: IProps) => {
	switch (type) {
		case 'input':
			return (
				<React.Fragment>
					<TextField
						label={label}
						name={name}
						inputRef={register({ ...validation, required: true })}
					/>
					{_.get(`${name}.type`, errors) === 'required' && (
						<p>This field is required</p>
					)}
				</React.Fragment>
			);
		case 'radio':
			return (
				<section>
					<label>Radio Group</label>
					<Controller
						control={control}
						as={
							<RadioGroup aria-label={label} name={name}>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Female'
								/>
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Male'
								/>
							</RadioGroup>
						}
						name='RadioGroup'
					/>
				</section>
			);
		case 'check':
			return (
				<React.Fragment>
					<TextField
						label={label}
						name={name}
						inputRef={register({ ...validation })}
					/>
					{_.get(`${name}.type`, errors) === 'required' && (
						<p>This field is required</p>
					)}
				</React.Fragment>
			);
		case 'select':
			return (
				<React.Fragment>
					<TextField
						label={label}
						name={name}
						inputRef={register({ ...validation })}
					/>
					{_.get(`${name}.type`, errors) === 'required' && (
						<p>This field is required</p>
					)}
				</React.Fragment>
			);
		default:
			return (
				<React.Fragment>
					<TextField
						label={label}
						name={name}
						inputRef={register({ ...validation })}
					/>
					{_.get(`${name}.type`, errors) === 'required' && (
						<p>This field is required</p>
					)}
				</React.Fragment>
			);
	}
};

export default Field;
