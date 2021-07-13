import axios from 'axios';

const ValidateUser = async (history: any, username = 'admin') => {
	const promise = axios.get(
		`http://localhost:5000/Auth/ValidateToken?username=${username}`
	);

	await promise
		.then(({ data }) => {
			return data.isValidToken;
		})
		.catch((error) => {
			return false;
		});
	return false;
};

export default ValidateUser;
