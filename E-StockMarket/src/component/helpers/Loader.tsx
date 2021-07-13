import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			width: '100vw',
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	})
);

const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<CircularProgress style={{ height: '100px', width: '100px' }} />
		</div>
	);
};

export default Loader;
