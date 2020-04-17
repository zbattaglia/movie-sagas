import React, { Component } from 'react';
import {connect} from 'react-redux';
import './MovieItem.css';

// Gets each movie passed to it from the list page
// renders the title, poster, and description for each movie in a div
class MovieItem extends Component {

    // on click of movie poster dispatch a GET BY ID to get the genres of movie from database and store selected
    // id in redux state
    // route to details page
    handleClick = ( movieId ) => {
        // console.log( 'Got a click on a movie', movieId );
        this.props.dispatch( { type: 'FETCH_GENRES', payload: movieId } );
        this.props.dispatch( { type: 'SELECT_MOVIE', payload: movieId } );
        this.props.history.push( '/details' )
    }; // end handleClick

    render() {
        let movie = this.props.movie;
        return (
            <div className="movieDisplay">
                <h2>{ movie.title }</h2>
                <br />
                <div className="movieDisplay-Body">
                    <img src={ movie.poster } alt="POSTER" onClick={ () => this.handleClick(  movie.id ) }/> { movie.description }
                </div>
            </div>
        );
    }
}

export default connect()(MovieItem);