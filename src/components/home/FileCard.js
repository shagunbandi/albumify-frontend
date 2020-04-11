import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    incrementCount,
} from '../../actions/searchActions';

export class FolderCard extends Component {

    render() {
        const { fileData } = this.props;
        const imageUrl = 'http://localhost:8000' + fileData;
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
    {
        incrementCount,
    }
)(FolderCard);