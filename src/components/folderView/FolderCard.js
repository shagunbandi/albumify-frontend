import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    selectSubDirectoryGlobal,
    addAlbumAtPath,
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
            let currentDir = folderData.split('/')
            currentDir = currentDir.slice(0, currentDir.length - 1).join('/');
            console.log("adding album at: " + currentDir);
            this.props.addAlbumAtPath(currentDir, "new album");
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
        addAlbumAtPath
    }
)(FolderCard);