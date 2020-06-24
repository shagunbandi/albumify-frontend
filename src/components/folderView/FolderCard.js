import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    selectSubDirectoryGlobal,
} from '../../actions/directoryAction';

export class FolderCard extends Component {
    selectSubDirectory = () => {
        const { folderData, isBackDir, addAlbum } = this.props;
        if (isBackDir) {
            let prevDir = folderData.split('/')
            prevDir = prevDir.slice(0, prevDir.length - 1).join('/');
            this.props.selectSubDirectoryGlobal(prevDir);
            return;
        }
        if (addAlbum) {
            this.props.handleShow();
            return;
        }
        this.props.selectSubDirectoryGlobal(folderData);
    }


    render() {
        const { folderData } = this.props;
        let folderName = folderData.split('/');
        folderName = folderName[folderName.length - 1];
        return (
            <div className="card folder-card" onClick={this.selectSubDirectory}>
                <div className="card-body btn btn-dark">
                    <h5 className="card-title">{folderName}</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    imageCount: state.directory.imageCount,
});


export default connect(
    mapStateToProps,
    {
        selectSubDirectoryGlobal,
    }
)(FolderCard);