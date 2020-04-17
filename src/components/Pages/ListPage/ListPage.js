import React, { Component } from 'react';
import {connect} from 'react-redux';

class MovieList extends Component {

  // on page load dispatch FETCH_MOVIE to call getMovieSaga on index.js
  componentDidMount() {
    this.props.dispatch( { type: 'FETCH_MOVIE' } );
  }

  render() {
    return (
      <div className="MovieList">
        <p>Movie List Goes Here</p>
      </div>
    );
  }
}

export default connect()(MovieList);