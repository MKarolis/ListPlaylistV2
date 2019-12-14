import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class ProtectedRoute extends React.Component{
    renderComponent(){
        console.log(this.props);
        const {component: Component, loggedInSpotify, loggedInGoogle} = this.props;
        if(loggedInSpotify && loggedInGoogle){
            return <Component/>;
        }
        return <Redirect to="/" />;
    }
    render() {
        return(
            <React.Fragment>
                {this.renderComponent()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>({
    loggedInSpotify : state.authentication.authenticatedWithSpotify,
    loggedInGoogle: state.authentication.authenticatedWithGoogle
});

export default connect(mapStateToProps)(ProtectedRoute);
