import React, { Component } from 'react';

import { connect } from 'react-redux';

// import SearchForm from './SearchForm';
import ImageContainer from './ImageContainer';
import Spinner from '../layout/Spinner';

import {
  setLoading,
  fetchImages
} from '../../actions/searchActions';


export class Landing extends Component {

  componentWillMount() {
    this.props.setLoading();
    this.props.fetchImages();
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="main-container">
        {/* <SearchForm /> */}
        {loading ? <Spinner /> : <ImageContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.images.loading
});

export default connect(
  mapStateToProps,
  { fetchImages, setLoading }
)(Landing);
