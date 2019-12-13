import React from 'react';
import { connect } from 'react-redux';

import './SourceSelect.css';
import { spotifyLogoBlue } from '../../assets/images/spotify-blue.svg';
import { youtubeLogoBlue } from '../../assets/images/youtube-blue.svg';


class SourceSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <div className='row'>
                <h2 className='center-heading heading-big'>Select playlist <br/> source</h2>
            </div>
            <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                        <a><img src = ''/></a>
                    </div>
                    <div className='col-md-6 com-sm-12'>
                        Second
                    </div>
            </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    authenticatedWithGoogle: state.authentication.authenticatedWithGoogle
});

export default connect(mapStateToProps)(SourceSelect);
