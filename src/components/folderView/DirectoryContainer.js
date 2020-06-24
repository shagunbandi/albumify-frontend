import React, { Component } from 'react';

import { connect } from 'react-redux';

import FolderCard from './FolderCard';

import {
    selectSubDirectoryGlobal,
    selectSubDirectoryGlobalPop,
    addAlbumAtPath,
    addAlbumAtPathPop
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

    selectSubDirectoryReducer = (dir) => {
        if (this.props.reducerSubName === 'directory') {
            this.props.selectSubDirectoryGlobal(dir);
        }
        else {
            this.props.selectSubDirectoryGlobalPop(dir);
        }
    }

    addAlbumAtPathReducer = (path, name) => {
        if (this.props.reducerSubName === 'directory') {
            this.props.addAlbumAtPath(path, name);
        }
        else {
            this.props.addAlbumAtPathPop(path, name);
        }
    }

    selectSubDirectory() {
        this.selectSubDirectoryReducer(this.props.directory[this.props.reducerSubName].currentDir);
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
    
    saveAlbum = () => {
        const { reducerSubName} = this.props
        const { currentDir, folder } = this.props.directory[reducerSubName];
        if (this.albumNameValue.value.length < 1) {
            this.setState({ err_msg: "album name cannot be empty" })
        }
        else if (folder[currentDir] !== undefined && folder[currentDir].includes(currentDir + "/" + this.albumNameValue.value)) {
            this.setState({err_msg:"album name already exists"})
        }
        else {
            this.addAlbumAtPathReducer(currentDir, this.albumNameValue.value);
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
                    onClick={() => this.selectSubDirectoryReducer(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
            else {
                return <li
                    key={i}
                    className='breadcrumb-item active'
                    onClick={() => this.selectSubDirectoryReducer(folderPath.slice(0, folderPath.length - 1))}
                ><span>{folerNameList[i]}</span></li>
            }
        })
        return folderPathList;
    }

    render() {
        const { reducerSubName } = this.props;
        const { currentDir, folder, addAlbum } = this.props.directory[reducerSubName];
            
        let subFolders = folder[currentDir];
        let backDir = this.getBackDir(currentDir);
        let folderPathList = this.getFolderPathList(currentDir);
        let content = [<FolderCard key={'-1'} folderData={backDir} isBackDir={true} addAlbum={false} selectSubDirectoryReducer={this.selectSubDirectoryReducer}/>]
        if (subFolders) {
            content.push(subFolders.map((folderData, index) => (
                <FolderCard key={index} folderData={folderData} isBackDir={false} addAlbum={false} selectSubDirectoryReducer={this.selectSubDirectoryReducer}/>
            )))
        }
        if (addAlbum) {
            let addBut = currentDir + '/Add Button';
            content.push(
                <FolderCard key={currentDir.length} folderData={addBut} isBackDir={false} addAlbum={true} handleShow={this.handleShow} selectSubDirectoryReducer={this.selectSubDirectoryReducer} />
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
    directory: state.directory,
    // folder: state.directory.directory.folder,
    // currentDir: state.directory.directory.currentDir,
    // addAlbum: state.directory.directory.addAlbum,
    // addAlbumResponse: state.directory.directory.addAlbumResponse
});

export default connect(
    mapStateToProps,
    {
        selectSubDirectoryGlobal,
        selectSubDirectoryGlobalPop,
        addAlbumAtPath,
        addAlbumAtPathPop
    }
)(DirectoryContainer);