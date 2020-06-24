import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    setLoading,
} from '../../actions/directoryAction';
import { ImageContainer } from '../imageContainer/ImageContainer';


export class FileContainer extends Component {

    render() {
        const { file, currentDir } = this.props;
        var data = file[currentDir];
        if (!data) {
            return (<h3>No Files Found !</h3>)
        }
        
        return (
            <div>
                <ImageContainer data={data} metadata={{response:"Success"}} />
            </div >
        );
    }
}

const mapStateToProps = state => ({
    file: state.directory.file,
    currentDir: state.directory.currentDir
});

export default connect(
    mapStateToProps,
    {
        setLoading,
    }
)(FileContainer);