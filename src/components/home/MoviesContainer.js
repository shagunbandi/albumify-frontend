import React, { Component } from 'react';

import { connect } from 'react-redux';

import MovieCard from './MovieCard';

export class MoviesContainer extends Component {
  render() {
    const { urls } = this.props;
    let content = '';
    console.log(this.props);
    content = urls.response === 'Success' ?
      urls.data.map((image, index) => (
        <MovieCard key={index} image={"localhost:8000" + image} />
      )) :
      "Data Could Not Be Loaded :("
    return <div className="row">{content}</div>;
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  urls: state.movies.urls
});

export default connect(mapStateToProps)(MoviesContainer);
