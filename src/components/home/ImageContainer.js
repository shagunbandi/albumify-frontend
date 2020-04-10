import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';

export class ImageContainer extends Component {

  render() {
    const { images } = this.props;
    if (!images) {
      return <div>Loading...</div>
    }
    let content = images.response === 'Success' ?
      images.data.map((image, index) => (
        <ImageCard key={index} image={image} />
      )) :
      "Data Could Not Be Loaded :("
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  imageCount: state.images.imageCount,
});

export default connect(
  mapStateToProps
)(ImageContainer);
