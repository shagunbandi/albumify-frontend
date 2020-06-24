import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setGalleryComponents
} from '../../actions/galleryAction';


export class ImageCard extends Component {

  showGalleryView = () => {
    const { images, current } = this.props;
    this.props.setGalleryComponents({
      current: current,
      images: images,
      show: true
    })
  }

  render() {
    const { image, loadedAnotherImage } = this.props;
    return (
      <img
        className="image-card"
        src={"http://localhost:8000/" + image}
        alt=""
        onLoad={loadedAnotherImage}
        onError={loadedAnotherImage}
        onClick={this.showGalleryView}
        loading="lazy"
      />
    );
  }
}

const mapStateToProps = state => ({
  imageCount: state.directory.imageCount,
});


export default connect(
  mapStateToProps,
  { setGalleryComponents }
)(ImageCard);