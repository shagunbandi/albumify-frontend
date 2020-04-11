import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    selectSubDirectoryGlobal
} from '../../actions/searchActions';

export class FolderCard extends Component {

    selectSubDirectory = () => {
        this.props.selectSubDirectoryGlobal(this.props.folderData);
    }

    render() {
        const { folderData } = this.props;
        let folderName = folderData.split('/');
        folderName = folderName[folderName.length - 1];
        return (
            <div className="card folder-card" onClick={this.selectSubDirectory}>
                <div className="card-body">
                    <h5 className="card-title">{folderName}</h5>
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
        selectSubDirectoryGlobal,
    }
)(FolderCard);