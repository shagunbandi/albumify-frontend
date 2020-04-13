import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';

import {
  getMoreImages
} from '../../actions/searchActions';


export class ImageContainer extends Component {

  componentDidUpdate(nextProps) {
    const { images, imageCount } = nextProps;
    if (!images) {
      return
    }
    if ('total_pages' in images && 'page_number' in images && images.total_pages === images.page_number) {
      return;
    }
    console.log(images.total_till_now + ", " + imageCount);
    if (images.total_till_now - 1 == imageCount) {
      this.props.getMoreImages(images.page_number + 1);
    }
  }


  render() {
    const { images } = this.props;
    if (!images) {
      return <div>Something Went Wrong :( </div>
    }
    let content = images.response === 'Success' ?
      images.data.map((image, index) => (
        <ImageCard key={index} image={image} />
      )) :
      "Data Could Not Be Loaded :("

    let total_images_till_now = images ? images.total_till_now : 0;
    let total_files = images ? images.total_files : 0;
    let imageCount = this.props.imageCount;

    return (
      <div>
        <h3>Progress: {imageCount}/{total_images_till_now}/{total_files}</h3>
        {content}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  images: state.album.images,
  imageCount: state.album.imageCount,
});

export default connect(
  mapStateToProps,
  {
    getMoreImages
  }
)(ImageContainer);