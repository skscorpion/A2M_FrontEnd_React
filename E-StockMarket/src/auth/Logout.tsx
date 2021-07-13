import axios from 'axios';

const Logout = (history: any, username = 'admin') => {
	const promise = axios.delete(
		`http://localhost:5000/Auth/DeleteAuthToken?username=${username}`
	);

	promise
		.then((res) => {
			history.push('/Login');
		})
		.catch((error) => history.push('/Login'));
};

export default Logout;
