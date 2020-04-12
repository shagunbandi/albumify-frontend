import React, { Component } from 'react';

import { connect } from 'react-redux';

// import SearchForm from './SearchForm';
import DirectoryContainer from './DirectoryContainer';
import FileContainer from './FileContainer'

import Spinner from '../layout/Spinner';

import {
  setLoading,
  getAllImagesWithPath,
  selectSubDirectoryGlobal
} from '../../actions/searchActions';


export class Landing extends Component {

  componentWillMount() {
    this.props.setLoading();
    this.props.getAllImagesWithPath();
    // this.props.fetchImages();
  }

  componentDidMount() {
    if (this.props.location.pathname !== "") {
      this.props.selectSubDirectoryGlobal(this.props.location.pathname);
    }

  }

  render() {
    const { loading } = this.props;
    return (
      <div className="main-container">
        {loading ? <Spinner /> : <DirectoryContainer />}
        <hr />
        {loading ? <Spinner /> : <FileContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.images.loading,
  folder: state.images.folder,
});

export default connect(
  mapStateToProps,
  {
    // fetchImages,
    setLoading,
    selectSubDirectoryGlobal,
    getAllImagesWithPath,
  }
)(Landing);
