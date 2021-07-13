import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { TextField, Radio } from 'final-form-material-ui';
import {
	Typography,
	Paper,
	Link,
	Grid,
	Button,
	CssBaseline,
	RadioGroup,
	FormLabel,
	FormGroup,
	FormControl,
	FormControlLabel,
	InputLabel,
} from '@material-ui/core';
import CellButton from '../helpers/CellButton';
import SelectInput from './selectInput';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import validate from './validation';
import axios from 'axios';
import Layout from '../layout';
import Authenticate from '../helpers/Authenticate';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface formProps {
	handleSubmit: any;
	reset: any;
	submitting: any;
	pristine: any;
	values: any;
}

interface Errors {
	firstName: string;
	lastName: string;
	email: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'flex-end',
		},
		form: {
			padding: theme.spacing(2),
			width: '70vw',
		},
		gridRow: {
			marginBottom: '15px',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		select: {
			width: '100%',
			borderTop: 'none',
			borderLeft: 'none',
			borderRight: 'none',
			outline: 'none',
			height: '35px',
		},
		dFlexEnd: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		pageRefresh: {
			marginLeft: '50px',
		},
		selectLabel: {
			fontSize: '12px',
		},
	})
);

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const CompanyForm = (props: any) => {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		setOpen(false);
		setError(false);
	};
	const classes = useStyles();
	const {
		history,
		isAuthenticated,
		match: { path },
	} = props;
	const isViewOnly = path === '/View';
	const pageHeading = path.replace('/', '');
	

	const onSubmit = async (values: any) => {
		console.log('values save',values)
		const headers = {
			'Content-Type': 'application/json',
		};
		const promise = axios.post('https://localhost:5001/Company', values, {
			headers,
		});

		promise
			.then((value) => {
				setOpen(true);
				setTimeout(() => {
					redirectToHome();
				}, 2000);
			})
			.catch((error) => setError(true));
	};

	const redirectToHome = () => {
		history.push('/Home');
	};

	const FormFirstRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4}>
					<Field
						fullWidth
						required
						name='code'
						component={TextField}
						type='text'
						label='Company Code'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Field
						fullWidth
						required
						name='name'
						component={TextField}
						type='text'
						label='Company Name'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
				<Field
						fullWidth
						required
						name='ceo'
						component={TextField}
						type='text'
						label='Company CEO'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					
				</Grid>
			</React.Fragment>
		);
	};

	const FormSecondRow = () => {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
				<Field
						fullWidth
						required
						name='turnover'
						component={TextField}
						type='number'
						label='Company Turnover In Cr'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
				<Field
						fullWidth
						required
						name='website'
						component={TextField}
						type='text'
						label='Company Website'
						disabled={isViewOnly}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.gridRow}>
				<InputLabel className={classes.selectLabel}>
						Stock Exchange
					</InputLabel>
					<Field<string>
						name='stockExchange'
						component={SelectInput}
						className={classes.select}
						disabled={isViewOnly}
						required
					>
						<option />
						<option value='bse'>BSE</option>
						<option value='nse'>NSE</option>
						<option value='both'>BOTH</option>
					</Field>
				</Grid>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<Layout props={props}>
				<div style={{ padding: 16, margin: 'auto', maxWidth: '70vw' }}>
					<Form
						onSubmit={onSubmit}
						initialValues={{ ...props.companyData }}
						validate={validate}
						render={({
							handleSubmit,
							submitting,
							pristine,
							values,
							hasValidationErrors,
						}) => (
							<form noValidate onSubmit={handleSubmit}>
								<Paper style={{ padding: 16 }}>
									<Grid container alignItems='flex-start' spacing={2}>
										<Grid item xs={12}>
											<h2>{pageHeading} Company</h2>
										</Grid>
										<FormFirstRow />
										<FormSecondRow />
										<Grid container alignItems='flex-start' spacing={2}>
											<Grid item style={{ marginTop: 16 }}>
												<Button
													variant='contained'
													color='primary'
													type='submit'
													disabled={submitting || isViewOnly}
												>
													Submit
												</Button>
											</Grid>
											<Grid item style={{ marginTop: 16 }}>
												<Button
													type='button'
													variant='contained'
													disabled={submitting}
													color='secondary'
													onClick={redirectToHome}
												>
													Cancel
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Paper>
							</form>
						)}
					/>
				</div>
			</Layout>
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => {
	return {
		companyData: state.company.selectedCompany,
	};
};

export default connect(mapStateToProps, {})(Authenticate(CompanyForm));
