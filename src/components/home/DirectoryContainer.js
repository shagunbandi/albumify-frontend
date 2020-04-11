import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';
import FolderCard from './FolderCard';

import {
    setLoading,
} from '../../actions/searchActions';


export class DirectoryContainer extends Component {

    render() {
        const { currentDir, folder, loading } = this.props;
        let subFolders = folder[currentDir];
        let content = subFolders.map((folderData, index) => (
            <FolderCard key={index} folderData={folderData} />
        ))
        return (
            <div>
                <h5>{currentDir}</h5>
                <div className='container'>
                    <div className='row'>
                        {content}
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    folder: state.images.folder,
    currentDir: state.images.currentDir
});

export default connect(
    mapStateToProps,
    {
        setLoading,
    }
)(DirectoryContainer);