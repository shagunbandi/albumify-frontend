import React, { Component } from 'react';

import { connect } from 'react-redux';

// import SearchForm from './SearchForm';
import ImageContainer from './ImageContainer';
import Spinner from '../layout/Spinner';

import {
  setLoading,
  fetchImages,
  getMoreImages
} from '../../actions/searchActions';


export class Landing extends Component {

  componentWillMount() {
    this.props.setLoading();
    this.props.fetchImages();
  }

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
    const { loading, images } = this.props;
    let total_images_till_now = images ? images.total_till_now : 0;
    let total_files = images ? images.total_files : 0;
    let imageCount = this.props.imageCount;
    return (
      <div className="main-container">
        {/* <SearchForm /> */}
        <h1>Progress: {imageCount}/{total_images_till_now}/{total_files}</h1>
        {loading ? <Spinner /> : <ImageContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.images.loading,
  images: state.images.images,
  imageCount: state.images.imageCount
});

export default connect(
  mapStateToProps,
  {
    fetchImages,
    setLoading,
    getMoreImages
  }
)(Landing);
