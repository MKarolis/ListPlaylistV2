import React from "react";

import PlaylistTransferModal from "../PlaylistTransferModal/PlaylistTransferModal";

class TempModal extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <PlaylistTransferModal show={true} history={this.props.history} />
        );
    }
}

export default TempModal;
