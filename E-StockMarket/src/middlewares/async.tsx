export default ({ dispatch, getState }: any) => (next: any) => (
	action: any
) => {
	// if (!action) {
	// 	return next(action);
	// }
	if (!action.payload || !action.payload.then) {
		return next(action);
	}

	if (action.payload && action.companies) {
		return next(action);
	}

	action.payload.then(function (response: any) {
		const newAction = { ...action, companies: response.data };
		dispatch(newAction);
	});
};
