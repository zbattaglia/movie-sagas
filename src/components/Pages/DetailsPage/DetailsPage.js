import React, { Component } from 'react';
import {connect} from 'react-redux';
import GenreList from '../../GenresList/GenresList';
import './DetailsPage.css';

class DetailsPage extends Component {

  // event listener to detect click of either button
  handleClick = ( button ) => {
    // onClick push the target route to history to route to appropriate page
    console.log( 'Got a click on button', button )
    this.props.history.push( button );
  }; // end handleClick


  // conditional render in case a user navigates to this page directly so it won't throw an error trying to access
  //.propery of null
  // the render also loops over the genres of the selected movie stored in redux state and renders to the page
  // the buttons route back to the main list or to the edit page
  display( movie ) {
    if( movie === null ) {
      return <></>
    }
    else {
      return <>
      <div className="details">
        <h2>{ movie.title }</h2>
        <div className="details-Body">
          <img src={ movie.poster } alt="POSTER" /> { movie.description }
        </div>
        <GenreList />
      </div>
        <footer>
          <button onClick={ (event) => this.handleClick( '/' ) }>Back to List</button>
          <button onClick={ (event) => this.handleClick( '/edit' ) }>Edit</button>
        </footer>
      </>
    }
  }
  

  render() {
    // the selected movie is the idea of the movie clicked on the last page
    // this loops through movieList stored in the redux state until that id is found and renders the details
    let movieDetails = null;
    for ( let movie of this.props.movies ) {
      if ( movie.id === this.props.selectedMovie ) {
        movieDetails = movie;
      }
    }

    return (
      <>{ this.display( movieDetails ) }</>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  selectedMovie: reduxStore.selectedMovie,
  movies: reduxStore.movies,

});

export default connect(putPropsOnReduxStore)(DetailsPage);