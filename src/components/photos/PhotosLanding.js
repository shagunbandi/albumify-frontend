import React, { Component } from 'react';

import { connect } from 'react-redux';

import {ImageContainer} from '../imageContainer/ImageContainer'

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
            <div className="pd-4">
                {loading ? <Spinner /> : <ImageContainer data={this.props.images.data} metadata={this.props.images}/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    images: state.photos.images,
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
