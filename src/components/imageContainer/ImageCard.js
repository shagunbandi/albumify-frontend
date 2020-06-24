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
    const { image, loadedAnotherImage, selectThisImage, selectionMode, selectedImages } = this.props;

    const SelectionModeAndSelected = "image-card selected selection-mode"
    const SelectionModeAndNotSelected = "image-card selection-mode"
    const NoSelectionMode = "image-card"

    return (
      <li className="image-li">
        <img
          className={!selectionMode ? NoSelectionMode
            : selectedImages.includes(image) ? SelectionModeAndSelected
            : SelectionModeAndNotSelected
          }
          src={"http://localhost:8000/" + image}
          alt=""
          onLoad={loadedAnotherImage}
          onError={loadedAnotherImage}
          loading="lazy"
          onClick={() => selectionMode ? selectThisImage(image) : undefined}/>
        {!selectionMode ? (
          <div>
            <div className="image-overlay image-overlay-left" onClick={() => selectThisImage(image)}>
              <span className="image-overlay-text">Select</span>
            </div>
            <div className="image-overlay image-overlay-right" onClick={this.showGalleryView}>
              <span className="image-overlay-text">Open</span>
            </div>
          </div>
        ): <span/>}
        
      </li>
    );
  }
}

const mapStateToProps = state => ({
});


export default connect(
  mapStateToProps,
  { setGalleryComponents }
)(ImageCard);