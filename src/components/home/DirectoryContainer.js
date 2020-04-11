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
        folderPathList = folderPathList.map((folderPath, i) => {
            if (i !== folderPathList.length - 1) {
                return <li
                    className='breadcrumb-item'
                    onClick={() => this.props.selectSubDirectoryGlobal(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
            else {
                return <li
                    className='breadcrumb-item active'
                    onClick={() => this.props.selectSubDirectoryGlobal(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
        })

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        {folderPathList}
                    </ol>
                </nav>
                {
                    content !== '' ?
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