import React, { Component } from 'react';

import { connect } from 'react-redux';

import DirectoryContainer from '../folderView/DirectoryContainer';
import FileContainer from '../folderView/FileContainer'

import Spinner from '../layout/Spinner';

import {
  setLoading,
  getAllAlbumsWithPath,
  selectSubDirectoryGlobal
} from '../../actions/directoryAction';
import Instructions from '../instructions';


export class AlbumLanding extends Component {

  componentWillMount() {
    this.props.setLoading();
    this.props.getAllAlbumsWithPath();
  }

  componentDidMount() {
    if (this.props.location.pathname !== "") {
      this.props.selectSubDirectoryGlobal(this.props.location.pathname);
    }
  }

  render() {
    const { loading, response } = this.props;
    return (
      <div className="bg-greyish">
        {
          loading ? <Spinner /> :
            !response ? <Instructions /> : (
              <span>
                <DirectoryContainer reducerSubName={'directory'} />
                <br />
                <FileContainer />
              </span>
            )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.directory.directory.loading,
  response: state.directory.directory.response
});

export default connect(
  mapStateToProps,
  {
    setLoading,
    selectSubDirectoryGlobal,
    getAllAlbumsWithPath,
  }
)(AlbumLanding);
