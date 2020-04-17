import React, { Component } from 'react';
import {connect} from 'react-redux';
import MovieItem from '../../MovieItem/MovieItem';

class MovieList extends Component {

  // on page load dispatch FETCH_MOVIE to call getMovieSaga on index.js
  componentDidMount() {
    this.props.dispatch( { type: 'FETCH_MOVIE' } );
  }


  // the render function gets the list of movies from redux state, maps over the array and passes each movie to
  // the movie item component for individual rendering
  render() {
    return (
      <div className="MovieList">
        { this.props.movies.map( movie => 
          <MovieItem key={ movie.id } movie={ movie } history={ this.props.history }/>
          )}
      </div>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  movies: reduxStore.movies,

});

export default connect(putPropsOnReduxStore)(MovieList);