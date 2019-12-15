import React from "react";

function ModalTransferSuccessDialog(props) {
    return (
        <React.Fragment>
            <div className="row">
                <p className="playlist-migration-heading">Playlist migration successful!</p>
            </div>
            <div className="row">
                <div className="col-8 align-self-center">
                    <div className="playlist-link-holder">
                        <iframe style={{"margin": "auto"}} width="560" height="315"
                                src="https://www.youtube.com/embed/videoseries?list=PLfkUcD2YjpadQfIV3Vb_eLpJZfIQ1Y0Qf"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-4 align-self-center">
                    <div className="transfer-controls-holder">
                        <button className="standart-btn transfer-control-btn">MIGRATE ANOTHER PLAYLIST</button>
                        <button className="standart-btn transfer-control-btn">LOG OUT</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ModalTransferSuccessDialog;
