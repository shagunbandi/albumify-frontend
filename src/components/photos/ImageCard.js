import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  incrementCount,
} from '../../actions/photosAction';

export class ImageCard extends Component {

  onImageLoad = () => {
    this.props.incrementCount();
  }

  render() {
    const { image } = this.props;
    return (
      <img className="image-card" src={"http://localhost:8000/" + image} alt="" onLoad={this.onImageLoad} onError={this.onImageLoad} />
    );
  }
}

const mapStateToProps = state => ({
  imageCount: state.album.imageCount,
});


export default connect(
  mapStateToProps,
  {
    incrementCount,
  }
)(ImageCard);