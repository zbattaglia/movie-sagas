import React, { Component } from 'react';
import {connect} from 'react-redux';
import GenreList from '../../GenresList/GenresList';
import './DetailsPage.css';
// card
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import { BrowserRouter as Router } from 'react-router-dom';

const styles = theme => ({
  card: {
    width: 600,
    minWidth: 450,
    minHeight: 500,
    marginTop: 25,
    display: 'inline-block',
    boxShadow: '0 16px 70px -12px',
  },
  button: {
    margin: theme.spacing.unit,
},
});

class DetailsPage extends Component {

  // getDetails(){
  //   let movieId = this.props.match.params.id;
  //   this.props.dispatch( { type: 'FETCH_GENRES', payload: movieId } );
  //   this.props.dispatch( { type: 'SELECT_MOVIE', payload: movieId } );
  //   console.log( 'ID from params:', movieId );
  // }


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
    const classes = this.props.classes
    if( movie === null ) {
      return <></>
    }
    else {
      return (
      <Card className={ classes.card }>
        <CardHeader title={movie.title}></CardHeader>
        <CardContent className="details">
          <div className="details-Body">
            <img src={ movie.poster } alt="POSTER" /> { movie.description }
          </div>
          <p>Genre's: <GenreList /></p>
        </CardContent>
          <CardActions className="footer">
            <Button variant='contained' className={classes.button} onClick={ (event) => this.handleClick( '/' ) }>Back to List</Button>
            <Button variant='contained' className={classes.button} onClick={ (event) => this.handleClick( '/edit' ) }>Edit</Button>
          </CardActions>
      </Card>
      )
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
      <div id="card">{ this.display( movieDetails ) }</div>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  selectedMovie: reduxStore.selectedMovie,
  movies: reduxStore.movies,

});

export default connect(putPropsOnReduxStore)(withStyles(styles)(DetailsPage));