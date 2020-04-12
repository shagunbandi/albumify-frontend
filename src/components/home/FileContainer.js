import React, { Component } from 'react';

import { connect } from 'react-redux';

import FileCard from './FileCard'

import {
    setLoading,
} from '../../actions/searchActions';


export class FileContainer extends Component {

    render() {
        const { file, currentDir } = this.props;
        if (!file[currentDir]) {
            return (<h3>No Files Found !</h3>)
        }
        let content = file[currentDir].map((fileData, index) => (
            <FileCard key={index} fileData={fileData} />
        ))
        return (
            <div>
                <div className='container-fluid'>
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