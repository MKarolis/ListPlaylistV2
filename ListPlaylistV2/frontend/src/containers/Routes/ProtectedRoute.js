import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import {checkCredentialsExpire} from "../../utils/auth/checkTokenExpire";

class ProtectedRoute extends React.Component{
    constructor(props){
        super(props);
    }
    renderComponent(){
        const { component: Component, loggedInSpotify, loggedInGoogle } = this.props;
        if(loggedInSpotify && loggedInGoogle) {
            return <Component history={this.props.history} />;
        }
        return <Redirect to="/" />;
    }
    render() {
        checkCredentialsExpire();
        return(
            <React.Fragment>
                {this.renderComponent()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>({
    loggedInSpotify : state.authentication.authenticatedWithSpotify,
    loggedInGoogle: state.authentication.authenticatedWithGoogle,
    source: state.playlists.source,
});

export default connect(mapStateToProps)(ProtectedRoute);
