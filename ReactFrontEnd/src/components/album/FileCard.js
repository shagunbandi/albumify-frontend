import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
} from '../../actions/albumAction';

export class FileCard extends Component {

    render() {
        const { fileData } = this.props;
        const imageUrl = 'http://localhost:8000/' + fileData;
        return (
            <div className="card file-card">
                <img className="file-card-image" src={imageUrl} alt={fileData} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
});


export default connect(
    mapStateToProps,
    {}
)(FileCard);