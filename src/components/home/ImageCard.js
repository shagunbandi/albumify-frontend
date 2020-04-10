import React, { Component } from 'react';

export class ImageCard extends Component {
  render() {
    const { image } = this.props;
    return (
      <img className="w-100 mb-2" src={"http://" + image} alt="Image" />
    );
  }
}

export default ImageCard;
