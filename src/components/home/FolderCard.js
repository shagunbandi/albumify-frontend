import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    incrementCount,
} from '../../actions/searchActions';

export class FolderCard extends Component {


    render() {
        const { folderData } = this.props;
        return (
            <div className="card folder-card">
                <div className="card-body">
                    <h5 className="card-title">{folderData}</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    imageCount: state.images.imageCount,
});


export default connect(
    mapStateToProps,
    {
        incrementCount,
    }
)(FolderCard);