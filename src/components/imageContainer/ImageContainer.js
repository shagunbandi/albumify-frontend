import React, { Component } from 'react';

import { connect } from 'react-redux';

import ImageCard from './ImageCard';
import DirectoryContainer from '../folderView/DirectoryContainer';

import {
  setLoadingPop,
  getAllAlbumsWithPathPopUp,
  selectSubDirectoryGlobal,
  addFilesToAlbum,
  removeFromAlbum
} from '../../actions/directoryAction';

export const imagesAtOnce = 100;

export class ImageContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      imageCount: 0,
      imagesLoaded: [],
      loadNextOn: 0,
      response: false,
      selectedImages: [],
      selectionMode: false,
      showDirectory: false
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
    imagesLoaded = data.slice(0, loadNextOn + imagesAtOnce);
    this.setState({ imagesLoaded, loadNextOn: loadNextOn + imagesAtOnce });
  }

  selectThisImage = (path) => {
    var selectedImages = this.state.selectedImages;
    if (selectedImages.includes(path)) {
      const index = selectedImages.indexOf(path);
      if (index > -1) {
        selectedImages.splice(index, 1);
      }
      if (selectedImages.length === 0) {
        this.setState({ selectionMode: false, selectedImages });
      }
      else {
        this.setState({ selectedImages });
      }
    }
    else {
      selectedImages.push(path);
      this.setState({ selectedImages, selectionMode: true })
    }
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
      this.setState({ imageCount: 0, imagesLoaded: data.slice(0, imagesAtOnce), loadNextOn: imagesAtOnce, response: true });
    }
  }

  componentDidMount() {
    let { data, metadata } = this.props;
    if (metadata.response !== 'Success') {
      this.setState({ response: false });
    }
    else {
      this.setState({ imageCount: 0, imagesLoaded: data.slice(0, imagesAtOnce), loadNextOn: imagesAtOnce, response: true });
    }
  }

  CallAndShowDirectory = () => {
    this.props.setLoadingPop();
    this.props.getAllAlbumsWithPathPopUp();
    this.setState({ showDirectory: true })
  }

  addToAlbum = () => {
    console.log(this.state.selectedImages);
    console.log(this.props.currentDir);
    this.props.addFilesToAlbum(this.state.selectedImages, this.props.currentDir);
    this.setState({ selectionMode: false, selectedImages: [], showDirectory: false })
    
  }

  removeFiles = () => {
    this.props.removeFromAlbum(this.state.selectedImages, this.props.currentDirAlbum);
    this.setState({ selectionMode: false, selectedImages: [] })
  }

  render() {
    let content = this.state.response ? this.state.imagesLoaded.map((image, index) => (
      <ImageCard key={index}
        image={image}
        current={index}
        images={this.props.data}
        loadedAnotherImage={this.loadedAnotherImage.bind(this)}
        selectThisImage={this.selectThisImage}
        selectionMode={this.state.selectionMode}
        selectedImages={this.state.selectedImages} />
    )) : "Content Could not be loaded :( ";

    return (
      <div>
        <ul className="image-ul">
          {content}
          <li className="image-li"></li>
        </ul>
        {this.state.selectionMode ?
          <div className="bottom-panel">
            <button className="btn btn-dark" onClick={this.CallAndShowDirectory}>Add to Album</button>&nbsp;
            {this.props.from === 'albumLanding' ?
              <span><button className="btn btn-dark" onClick={this.removeFiles}>Remove from Album</button>&nbsp;</span>:
              <span />
            }
            <button className="btn btn-dark" onClick={() => this.setState({ selectionMode: false, selectedImages: [] })}>Cancel</button>
          </div>
          : <span />}
        {this.state.showDirectory ?
          <div className="modal">
            <div className="directory-container-pop">
              <DirectoryContainer reducerSubName={'directory_pop'} />
              <div className="bottom-panel">
                <button className="btn btn-dark" onClick={this.addToAlbum}>Select</button>&nbsp;
              <button className="btn btn-dark" onClick={() => this.setState({ showDirectory: false })}>Cancel</button>
              </div>
            </div>
          </div> : <span />}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  dataLoaded: state.photos.dataLoaded,
  currentDir: state.directory.directory_pop.currentDir,
  currentDirAlbum: state.directory.directory.currentDir
});

export default connect(
  mapStateToProps,
  {
    setLoadingPop,
    selectSubDirectoryGlobal,
    getAllAlbumsWithPathPopUp,
    addFilesToAlbum,
    removeFromAlbum
  }
)(ImageContainer);