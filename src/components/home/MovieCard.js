import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MovieCard extends Component {
  render() {
    const { image } = this.props;
    return (
      <img className="w-100 mb-2" src={"http://" + image} alt="Image" />
    );
  }
}

export default MovieCard;
