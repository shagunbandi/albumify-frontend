import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';
import FolderCard from './FolderCard';
import FileCard from './FileCard'

import {
    setLoading,
} from '../../actions/searchActions';


export class FileContainer extends Component {

    render() {
        const { file, currentDir } = this.props;
        console.log(file[currentDir]);
        let content = file[currentDir].map((fileData, index) => (
            <FileCard key={index} fileData={fileData} />
        ))
        return (
            <div>
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
    file: state.images.file,
    currentDir: state.images.currentDir
});

export default connect(
    mapStateToProps,
    {
        setLoading,
    }
)(FileContainer);