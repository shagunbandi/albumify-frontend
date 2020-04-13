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

        let backDir = currentDir.split('/');
        if (backDir.length == 1) {
            backDir = backDir[0];
        }
        else {
            backDir = backDir.slice(0, backDir.length - 1).join('/');
        }
        backDir += '/Back'

        let content = [<FolderCard key={'-1'} folderData={backDir} isBackDir={true} />]
        if (subFolders) {
            content.push(subFolders.map((folderData, index) => (
                <FolderCard key={index} folderData={folderData} isBackDir={false} />
            )))
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
                <nav aria-label="breadcrumb" className="breadcums-nav">
                    <ol class="breadcrumb">
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
    folder: state.album.folder,
    currentDir: state.album.currentDir
});

export default connect(
    mapStateToProps,
    {
        setLoading,
        selectSubDirectoryGlobal
    }
)(DirectoryContainer);