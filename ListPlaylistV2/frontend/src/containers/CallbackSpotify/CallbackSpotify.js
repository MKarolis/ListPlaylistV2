import React from "react";
import queryString from 'query-string';
import {connect} from 'react-redux';

import * as authActions from "../../state/authentication/authenticationActions";

class CallbackSpotify extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount() {
        let params = queryString.parse(this.props.location.hash);
        if(params.access_token && params.token_type && params.expires_in){
            let currentTime = new Date().getTime();
            this.props.spotifyLogIn(params.access_token, currentTime+0.9*(params.expires_in*1000)); // Reduce expiry time to have some headroom
        }

        this.props.history.replace('/')
    }

    render() {
        return(
            <h1>Loading...</h1>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    spotifyLogIn: (token, expiresAt) => dispatch(authActions.loginWithSpotify(token, expiresAt))
});

export default connect(mapStateToProps, mapDispatchToProps)(CallbackSpotify);
