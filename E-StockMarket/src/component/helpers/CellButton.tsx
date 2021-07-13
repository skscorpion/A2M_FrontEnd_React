import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const CellButton = ({ clicked, value, color, caption }: any) => {
	const btnClickedHandler = () => {
		clicked(value);
	};

	return (
		<Button
			type='button'
			fullWidth
			variant='contained'
			color={color}
			onClick={btnClickedHandler}
		>
			{caption}
		</Button>
	);
};

export default CellButton;
