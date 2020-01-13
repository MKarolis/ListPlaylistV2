import React from 'react';
import './GlobalErrorBoundary.css';
import { connect } from 'react-redux';

class GlobalErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
		// log here
	}

	render() {
		const { hasErrorPlaylists, hasErrorMigration } = this.props;

		if (this.state.hasError || hasErrorPlaylists || hasErrorMigration) {
			this.props.history.push('/');
			return (
				<div className="error-text-div">
					<h1 className="error-text">Something went wrong :(</h1>
				</div>
			);
		}

		console.log('wut');

		return this.props.children;
	}
}

const mapStateToProps = state => ({
	hasErrorPlaylists: state.playlists.hasError,
	hasErrorMigration: state.migration.hasError
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GlobalErrorBoundary);
