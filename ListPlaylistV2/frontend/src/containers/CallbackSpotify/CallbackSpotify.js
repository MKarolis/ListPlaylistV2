import React from "react";

class CallbackSpotify extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            <h1>Loading...</h1>
        )
    }
}

export default CallbackSpotify;
