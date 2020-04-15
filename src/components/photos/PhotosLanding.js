import React, { Component } from 'react';

import { connect } from 'react-redux';

import FileContainer from './FileContainer'

import Spinner from '../layout/Spinner';

import {
    setLoading,
    fetchImages
} from '../../actions/photosAction';


export class PhotosLanding extends Component {

    componentDidMount() {
        if (!this.props.dataLoaded) {
            this.props.setLoading();
            this.props.fetchImages();
        }
    }

    render() {
        const { loading } = this.props;
        return (
            <div className="main-container">
                {loading ? <Spinner /> : <FileContainer />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.photos.loading,
    dataLoaded: state.photos.dataLoaded
});

export default connect(
    mapStateToProps,
    {
        setLoading,
        fetchImages,
    }
)(PhotosLanding);
