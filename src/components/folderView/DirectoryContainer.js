import React, { Component } from 'react';

import { connect } from 'react-redux';

import FolderCard from './FolderCard';

import {
    setLoading,
    selectSubDirectoryGlobal,
    addAlbumAtPath
} from '../../actions/directoryAction';


export class DirectoryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInputModal: false,
            err_msg: ""
        }
    }

    handleClose = () => this.setState({ showInputModal: false, err_msg:"" });
    handleShow = () => this.setState({ showInputModal: true });


    selectSubDirectory() {
        this.props.selectSubDirectoryGlobal(this.props.currentDir);
        console.log("Clicked");
    }

    getBackDir(currentDir) {
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
    
    saveAlbum = () => {
        const { currentDir, folder, addAlbumAtPath } = this.props;
        if (this.albumNameValue.value.length < 1) {
            this.setState({ err_msg: "album name cannot be empty" })
        }
        else if (folder[currentDir] !== undefined && folder[currentDir].includes(currentDir + "/" + this.albumNameValue.value)) {
            this.setState({err_msg:"album name already exists"})
        }
        else {
            addAlbumAtPath(currentDir, this.albumNameValue.value);
            this.handleClose();
        }
    }


    getFolderPathList(currentDir) {
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
                <FolderCard key={currentDir.length} folderData={addBut} isBackDir={false} addAlbum={true} handleShow={this.handleShow} />
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
                {this.state.showInputModal ?
                    (<div class="modal" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Enter Album Name</label>
                                        <input class="form-control" ref={(albumNameValue) => { this.albumNameValue = albumNameValue }} type="text" placeholder="New Album Name" />                                    </div>
                                        <small id="emailHelp" class="form-text color-red">{this.state.err_msg}</small>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" onClick={this.saveAlbum} >Save changes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>) : <span />}
            </div >
        );
    }
}

const mapStateToProps = state => ({
    folder: state.directory.folder,
    currentDir: state.directory.currentDir,
    addAlbum: state.directory.addAlbum,
    addAlbumResponse: state.directory.addAlbumResponse
});

export default connect(
    mapStateToProps,
    {
        setLoading,
        selectSubDirectoryGlobal,
        addAlbumAtPath
    }
)(DirectoryContainer);