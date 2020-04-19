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

    // this finds the genres associated with the specific movie by comparing the id's
    // passess the genre to the formatter to format the genre list
    getGenres( movie ){
        for( let item of this.props.genres ) {
            if( item.id === movie.id ) {
                // return this.formatGenres({item})
                let genres = this.formatGenres( item.genres );
                return <p>{genres}</p>
            }
        }
    }

    // returns the genres for the selected movie in the correct format
    formatGenres( genres ){
        let formattedGenres = '';
        for ( let i = 0; i < genres.length; i++ ){
            if ( i === 0 ){
                formattedGenres += genres[0];
            }
            else {
                formattedGenres += `, ${genres[i]}`
            }
        }
        return formattedGenres;
    }

    render() {
        let movie = this.props.movie;
        return (
            <div className="movieDisplay">
                <div className="title">
                    {movie.title}
                </div>
                <div className="movieDisplay-Body">
                    <img src={ movie.poster } alt="POSTER" onClick={ () => this.handleClick(  movie.id ) } />
                </div>
                <div className="genres">
                    { this.getGenres( movie ) }
                </div>
            </div>
        );
    }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
    genres: reduxStore.genres,
  
  });
  
  export default connect(putPropsOnReduxStore)(MovieItem);