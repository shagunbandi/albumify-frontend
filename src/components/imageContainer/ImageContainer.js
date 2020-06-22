import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';

export class ImageContainer extends Component {

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
    let { data, metadata } = this.props;
    if (metadata.response !== 'Success') {
      return;
    }
    imagesLoaded = data.slice(0, loadNextOn + 50);
    this.setState({ imagesLoaded, loadNextOn: loadNextOn + 50 });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return;
    }

    let { data, metadata } = nextProps;
    if (metadata.response !== 'Success') {
      this.setState({ response: false });
    }
    else {
      this.setState({ imageCount: 0, imagesLoaded: data.slice(0, 50), loadNextOn: 50, response: true });
    }

  }

  componentDidMount() {
    let { data, metadata } = this.props;
    if (metadata.response !== 'Success') {
      this.setState({ response: false });
    }
    else {
      this.setState({ imageCount: 0, imagesLoaded: data.slice(0, 50), loadNextOn: 50, response: true });
    }
  }

  render() {
    let content = this.state.response ? this.state.imagesLoaded.map((image, index) => (
      <li className="image-li">
        <ImageCard key={index} image={image} current={index} images={this.props.data} loadedAnotherImage={this.loadedAnotherImage.bind(this)} />
      </li>
    )) : "Content Could not be loaded :( ";

    return (
      <div>
        <ul className="image-ul">
          {content}
          <li className="image-li"></li>
        </ul>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  dataLoaded: state.photos.dataLoaded
});

export default connect(
  mapStateToProps
)(ImageContainer);