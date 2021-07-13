import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { signOut, signIn } from '../actions';

interface LoginFormValues {
	username?: string;
	password?: string;
}

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='http://localhost:3002/'>
				E-Stock Market
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	color: {
		color: 'red',
	},
}));

const Login = (props: any) => {
	const formValues = {
		username: '',
		password: '',
	};
	const classes = useStyles();
	const [state, setState] = useState({
		formData: formValues,
		isLoginFailed: false,
	});

	const onAuthChange = (isSignedIn: any) => {
		if (isSignedIn) {
			props.signIn();
		} else {
			props.signOut();
		}
	};

	// set isSignedIn as false whenever loading this component
	onAuthChange(false);

	const handleChange = (e: any) => {
		setState({
			...state,
			formData: { ...state.formData, [e.target.name]: e.target.value.trim() },
		});
	};

	function handleSubmit(event: any) {
		event.preventDefault();
		const username = state.formData.username.toLowerCase();
		if (username === 'admin' && state.formData.password === 'admin') {
			const headers = {
				'Content-Type': 'application/json',
			};
			props.history.push('/Home');
		// 	const promise = axios.get(
		// 		`http://localhost:5000/Auth?username=${username}`
		// 	);

		// 	promise
		// 		.then((value) => {
		// 			onAuthChange(true);
		// 			props.history.push('/Home');
		// 		})
		// 		.catch((error) => setState({ ...state, isLoginFailed: true }));
		} else {
			setState({ ...state, isLoginFailed: true });
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				{state.isLoginFailed && (
					<Alert severity='warning'>Invalid username or password</Alert>
				)}
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='username'
						label='User Name'
						name='username'
						autoComplete='false'
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							{/* <Link href='#' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link> */}
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default connect(null, { signIn, signOut })(Login);
