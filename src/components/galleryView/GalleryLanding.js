import React, { Component } from 'react';

import { connect } from 'react-redux';

import { BASE_URL} from '../../actions/constants'

import {
  setCurrentValue,
  closeGalleryView,
} from '../../actions/galleryAction';


export class GalleryLanding extends Component {

  closeGallery = (event) => {
    event.preventDefault();
    if (event.currentTarget === event.target) {
      this.props.closeGalleryView();
    }
  }

  nextImage = () => {
    const { current, images } = this.props;
    const next = (current + 1) % images.length;
    this.props.setCurrentValue(next)
  }

  prevImage = () => {
    const { current, images } = this.props;
    const next = (current - 1 + images.length) % images.length;
    this.props.setCurrentValue(next)
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const { current, images } = this.props;

    let imageUrl = BASE_URL + images[current];
    let smallContent = images.map((image, index) => {
      let imageURL = BASE_URL + image;
      if (index === current) return (
        <img className="gallery-image-small active" key={index} src={imageURL} alt={image} onClick={() => {
          this.props.setCurrentValue(index);
        }} />
      )

      return (
        <img className="gallery-image-small" key={index} src={imageURL} alt={image} onClick={() => {
          this.props.setCurrentValue(index);
        }} />
      )
    })

    // let content = "Content";this.props.closeGalleryView()

    return (
      <div className="gallery-container" onClick={this.closeGallery}>
        <div className='gallery-container-holder container'>
          <div className='gallery-main-image'>
            <div className="cross">
              <div className="btn btn-dark btn-gall" onClick={() => { this.props.closeGalleryView() }}>close</div>
              <div className="btn btn-dark btn-gall" onClick={this.prevImage}>prev</div>
              <div className="btn btn-dark btn-gall" onClick={this.nextImage}>next</div>
              {/* <a href={imageUrl} className="btn btn-dark btn-gall">open</a> */}
            </div>
            <span class="helper"></span>
            <img src={imageUrl} className="gallery-image" alt="" />
          </div>
          <div className='gallery-small-images'>
            {smallContent}
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  current: state.gallery.current,
  images: state.gallery.images,
  show: state.gallery.show
});

export default connect(
  mapStateToProps,
  { setCurrentValue, closeGalleryView }
)(GalleryLanding);
