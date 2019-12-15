import React from "react";
import LoadingSmall from "../LoadingSmall/LoadingSmall";
import {Modal} from "react-bootstrap";

function ModalTransferDialog(props) {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-9 align-self-center align-content-center">
                    <div className="playlist-info-holder">
                        <img className="playlist-modal-img" src="https://pl.scdn.co/images/pl/default/f679b3035cb86817744bdd66753848fb14d85027" />
                        <div className="playlist-text-holder">
                            <p>Zuokai atiduok pinigus Zuokai</p>
                            <p>69 songs</p>
                            <p>Source: Spotify</p>
                            <p>Owner: Carlos Mendez</p>
                        </div>
                    </div>
                </div>
                <div className="col-3 align-self-center">
                    <div className="transfer-controls-holder">
                        {/*<LoadingSmall/>*/}
                        <button className="standart-btn transfer-control-btn">TRANSFER</button>
                        <button className="standart-btn transfer-control-btn">CANCEL</button>
                    </div>
                </div>
            </div>
            <div className="row">
                {/*
                        <p className="playlist-migration-tip">Press 'TRANSFER' to begin migrating the playlist</p>*/}
                <p className="playlist-migration-tip">Playlist migration in progress, please don't close this window.</p>
            </div>
        </React.Fragment>
    );
}

export default ModalTransferDialog;
