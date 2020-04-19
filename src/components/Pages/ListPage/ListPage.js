import React, { Component } from 'react';
import {connect} from 'react-redux';
import MovieItem from '../../MovieItem/MovieItem';
// styles
import './ListPage.css';
import { unstable_Box as Box } from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class MovieList extends Component {

  // on page load dispatch FETCH_MOVIE to call getMovieSaga on index.js
  componentDidMount() {
    this.props.dispatch( { type: 'FETCH_MOVIE' } );
  }


  // the render function gets the list of movies from redux state, maps over the array and passes each movie to
  // the movie item component for individual rendering
  render() {
    return (
      <div id="MoviePage">
        <Box className="ListBorder" id="left">
        </Box>
        <Box id="MovieList">
          { this.props.movies.map( movie => 
            <MovieItem key={ movie.id } movie={ movie } history={ this.props.history }/>
            )}
        </Box>
        <Box className ="ListBorder" id="right">
        </Box>
      </div>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  movies: reduxStore.movies,

});

export default connect(putPropsOnReduxStore)(MovieList);