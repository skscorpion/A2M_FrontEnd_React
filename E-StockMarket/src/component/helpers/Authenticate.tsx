import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from './Loader';

interface IComponentProps {
	isAuthenticate: boolean;
	history: any;
}

interface IComponentState {
	loading: boolean;
	isAuthenticated: boolean;
}

export default (ChildComponent: any) => {
	class ComposedComponent extends Component<IComponentProps, IComponentState> {
		constructor(props: IComponentProps) {
			super(props);
			this.state = { isAuthenticated: props.isAuthenticate, loading: true };
		}

		componentDidMount() {
			this.authenticate();
		}

		componentDidUpdate() {
			// this.authenticate();
		}

		authenticate() {
			if (!this.state.isAuthenticated) {
				this.setState({ ...this.state, loading: false });
				// const promise = axios.get(
				// 	`http://localhost:5000/Auth/ValidateToken?username=admin`
				// );

				// promise
				// 	.then(({ data }) => {
				// 		if (data.isValidToken) {
				// 			this.setState({ ...this.state, loading: false });
				// 		} else {
				// 			this.props.history.push('/Login');
				// 		}
				// 	})
				// 	.catch((error) => {
				// 		this.props.history.push('/Login');
				// 	});
			} else {
				this.setState({ loading: false });
			}
		}

		render() {
			return (
				<React.Fragment>
					{this.state.loading && <Loader />}
					{!this.state.loading && <ChildComponent {...this.props} />}
				</React.Fragment>
			);
		}
	}
	const mapStateToProps = (state: any) => {
		return { isAuthenticated: state.auth.isSignedIn };
	};

	return connect(mapStateToProps, {})(ComposedComponent);
};
