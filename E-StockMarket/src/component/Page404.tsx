import React from 'react';
import './page404.css';
import Button from '@material-ui/core/Button';

const pageNotFound = (props: any) => {
	const redirectToHome = () => {
		props.history.push('/Home');
	};
	return (
		<div className='pagenotfound-container'>
			<div className='pagenotfound-img'></div>
			<div className='pagenotfound-btn'>
				<Button
					type='button'
					variant='contained'
					color='primary'
					onClick={redirectToHome}
				>
					GO TO HOMEPAGE
				</Button>
			</div>
		</div>
	);
};

export default pageNotFound;
