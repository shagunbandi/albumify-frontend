import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ImageCard extends Component {

  onImageLoad = () => {
    // this.props.incrementCount();
  }

  render() {
    const { image, loadedAnotherImage } = this.props;
    return (
      <img className="image-card" src={"http://localhost:8000/" + image} alt="" onLoad={loadedAnotherImage} onError={loadedAnotherImage} />
    );
  }
}

const mapStateToProps = state => ({
  imageCount: state.album.imageCount,
});


export default connect(
  mapStateToProps
)(ImageCard);