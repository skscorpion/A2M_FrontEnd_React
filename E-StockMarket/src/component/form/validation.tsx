const validate = (values: any) => {
	const requiredErrorMsg = 'This field is Required';
	const errors: any = {};
	// surName
	if (!values.code) {
		errors.code = requiredErrorMsg;
	}
	// firstName
	if (!values.name) {
		errors.name = requiredErrorMsg;
	}
	// gender
	if (!values.stockExchange) {
		errors.stockExchange = requiredErrorMsg;
	}
	// age
	if (!values.turnOver) {
		errors.turnOver = requiredErrorMsg;
	} else if (isNaN(Number(values.turnOver))) {
		errors.turnOver = 'Must be a number';
	}
	// maritalStatus
	if (!values.ceo) {
		errors.ceo = requiredErrorMsg;
	}
	// religion
	if (!values.website) {
		errors.website = requiredErrorMsg;
	}
	// kinEmail
	// if (!values.kinEmail) {
	// 	errors.kinEmail = requiredErrorMsg;
	// } else if (
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.kinEmail)
	// ) {
	// 	errors.kinEmail = 'Invalid email address';
	// }

	return errors;
};

export default validate;
