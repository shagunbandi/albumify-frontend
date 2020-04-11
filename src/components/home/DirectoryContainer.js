import React, { Component } from 'react';

import { connect } from 'react-redux';

import FolderCard from './FolderCard';

import {
    setLoading,
    selectSubDirectoryGlobal
} from '../../actions/searchActions';


export class DirectoryContainer extends Component {

    selectSubDirectory() {
        this.props.selectSubDirectoryGlobal(this.props.currentDir);
        console.log("Clicked");
    }

    render() {
        const { currentDir, folder, loading } = this.props;
        let subFolders = folder[currentDir];
        let content = ''
        if (subFolders) {
            content = subFolders.map((folderData, index) => (
                <FolderCard key={index} folderData={folderData} />
            ))
        }

        let prev = '';
        let folerNameList = currentDir.split('/')
        let folderPathList = folerNameList.map((folderName, i) => {
            prev += folderName + '/'
            return prev;
        })
        folderPathList = folderPathList.map((folderPath, i) => (
            <span onClick={() => this.props.selectSubDirectoryGlobal(folderPath.slice(0, folderPath.length - 1))}>{folerNameList[i]}/</span>
        ));

        return (
            <div>
                <h5>{folderPathList}</h5>
                {content !== '' ?
                    <div className='container'>
                        <div className='row'>
                            {content}
                        </div>
                    </div> : ''
                }

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
        selectSubDirectoryGlobal
    }
)(DirectoryContainer);