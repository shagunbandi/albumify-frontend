import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  incrementCount
} from '../../actions/searchActions';



export class ImageCard extends Component {

  onImageLoad = () => {
    this.props.incrementCount();
    console.log(this.props.imageCount);
  }

  render() {
    const { image } = this.props;
    return (
      <img className="image-card" src={"http://localhost:8000" + image} alt="" onLoad={this.onImageLoad} />
    );
  }
}

const mapStateToProps = state => ({
  imageCount: state.images.imageCount,
});


export default connect(
  mapStateToProps,
  { incrementCount }
)(ImageCard);