import React from 'react';
import spotifyLogo from '../../assets/images/spotify-logo.png';
import { connect } from 'react-redux';
import './Convert.css';
import SpotifyTable from '../../components/Table/Table';
import ConvertButton from '../../components/Button/Button';

class Convert extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { spotifyUser } = this.props;
		return (
			<div className="flex-column">
				<div className="row">
					<h1 className="convert-heading">Select playlist to move</h1>
				</div>
				<div className="row">
					<SpotifyTable />
				</div>
				<div className="row">
					<ConvertButton />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	spotifyUser: state.spotifyUser
});

//export default Home;

export default connect(mapStateToProps)(Convert);
