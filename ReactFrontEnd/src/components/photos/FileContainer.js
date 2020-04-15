import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';

export class FileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageCount: 0,
      imagesLoaded: [],
      loadNextOn: 0,
      response: false,
    }
  }

  loadedAnotherImage = () => {
    this.setState({ imageCount: this.state.imageCount + 1 }, () => {
      if (this.state.imageCount === this.state.loadNextOn) {
        this.loadMoreImages();
      }
    });
  }

  loadMoreImages() {
    let { imagesLoaded, loadNextOn } = this.state;
    let { images } = this.props;
    if (images.response !== 'Success') {
      return;
    }
    imagesLoaded = images.data.slice(0, loadNextOn + 50);
    this.setState({ imagesLoaded, loadNextOn: loadNextOn + 50 });
  }

  componentDidMount() {
    let { images } = this.props;
    if (images.response !== 'Success') {
      this.setState({ response: false });
    }
    else {
      this.setState({ imageCount: 0, imagesLoaded: images.data.slice(0, 50), loadNextOn: 50, response: true });
    }
  }

  render() {
    let content = this.state.response ? this.state.imagesLoaded.map((image, index) => (
      <ImageCard key={index} image={image} loadedAnotherImage={this.loadedAnotherImage.bind(this)} />
    )) : "Content Could not be loaded :( ";

    return (
      <div>
        {content}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  images: state.photos.images,
  dataLoaded: state.photos.dataLoaded
});

export default connect(
  mapStateToProps
)(FileContainer);