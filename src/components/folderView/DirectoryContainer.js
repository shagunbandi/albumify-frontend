import React, { Component } from 'react';

import { connect } from 'react-redux';

import FolderCard from './FolderCard';

import {
    setLoading,
    selectSubDirectoryGlobal
} from '../../actions/directoryAction';


export class DirectoryContainer extends Component {

    selectSubDirectory() {
        this.props.selectSubDirectoryGlobal(this.props.currentDir);
        console.log("Clicked");
    }

    getBackDir(currentDir) {
        // Get Back Dir URL
        // If Already Root, home/Back else, home/dir1/dir2/Back
        let backDir = currentDir.split('/');
        if (backDir.length === 1) {
            backDir = backDir[0];
        }
        else {
            backDir = backDir.slice(0, backDir.length - 1).join('/');
        }
        backDir += '/Back'
        return backDir;
    }

    addButton(currentDir) {
        return currentDir + '/Add Button';
    }

    getFolderPathList(currentDir) {
        // Get Folder Array for BreadCrums
        let prev = '';
        let folerNameList = currentDir.split('/')
        let folderPathList = folerNameList.map((folderName, i) => {
            prev += folderName + '/'
            return prev;
        })
        folderPathList = folderPathList.map((folderPath, i) => {
            if (i !== folderPathList.length - 1) {
                return <li
                    key={i}
                    className='breadcrumb-item'
                    onClick={() => this.props.selectSubDirectoryGlobal(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
            else {
                return <li
                    key={i}
                    className='breadcrumb-item active'
                    onClick={() => this.props.selectSubDirectoryGlobal(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
        })
        return folderPathList;
    }

    render() {
        const { currentDir, folder, addAlbum } = this.props;
            
        let subFolders = folder[currentDir];
        let backDir = this.getBackDir(currentDir);
        let folderPathList = this.getFolderPathList(currentDir);
        let content = [<FolderCard key={'-1'} folderData={backDir} isBackDir={true} addAlbum={false} />]
        if (subFolders) {
            content.push(subFolders.map((folderData, index) => (
                <FolderCard key={index} folderData={folderData} isBackDir={false} addAlbum={false}/>
            )))
        }
        if (addAlbum) {
            let addBut = this.addButton(currentDir);
            content.push(
                <FolderCard key={currentDir.length} folderData={addBut} isBackDir={false} addAlbum={true} />
            )
        }

        return (
            <div>
                <nav className="breadcums-nav">
                    <ol className="breadcrumb">
                        {folderPathList}
                    </ol>
                </nav>
                {
                    content !== '' ?
                        <div className='container-fluid'>
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
    folder: state.directory.folder,
    currentDir: state.directory.currentDir,
    addAlbum: state.directory.addAlbum
});

export default connect(
    mapStateToProps,
    {
        setLoading,
        selectSubDirectoryGlobal
    }
)(DirectoryContainer);