import React, { Component } from 'react';
import {connect} from 'react-redux';
import './EditPage.css';
//
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  card: {
    width: 600,
    marginTop: 10,
    minWidth: 450,
    minHeight: 350,
    marginTop: 25,
    display: 'inline-block',
    boxShadow: '0 16px 70px -12px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 50,
    minWidth: 400,
  },
  button: {
    margin: theme.spacing.unit,
},
});

class EditPage extends Component {

    // set initial state for capturing edits
    state = {
      id: this.props.selectedMovie,
      title: '',
      description: '',
    }; 

  // on page load gets the durrent movie and sets initial state to that movies title and description
  // this automatically shows the titel and description in the edit fields
  componentDidMount(){
    for ( let movie of this.props.movies ) {
      if ( movie.id === this.props.selectedMovie ) {
        this.setState({
          ...this.state,
          title: movie.title,
          description: movie.description,
        })
      }
    }
  }

  // detects changes on either input field and updates local state
  handleChange = ( event, editCategory ) => {
    console.log( 'Got an edit', editCategory, event.target.value )
    this.setState({
      ...this.state,
      [ editCategory ]: event.target.value,
    });
  }

  // detect a button click, route back to previous page, dispatch edits if save was clicked, otherwise cancel
  handleClick = ( button ) => {
    console.log( 'Got button click', button );
    if( button === 'save' ) {
      console.log( 'Edits saved' );
      this.props.dispatch( { type: 'EDIT_MOVIE', payload: this.state } );
    }
      this.props.history.push( '/details' );
  } // end handleClick

  render() {
    const classes = this.props.classes;
    return (
      <Card className={classes.card}>
        <CardContent className="editField">
          <TextField fullWidth label="Edit Title" id="standard" type="text" onChange={ ( event ) => this.handleChange( event, 'title' )} value={ this.state.title }></TextField>
          <br />
          <TextField fullWidth multiline label="Edit Description" id="standard" type="text" onChange={ ( event ) => this.handleChange( event, 'description' )} value={ this.state.description }></TextField>
        </CardContent>
        <CardActions className="footer">
          <Button variant="contained" className={classes.button} onClick={ (event) => this.handleClick( 'cancel' ) }>Cancel</Button>
          <Button variant="contained" className={classes.button} onClick={ (event) => this.handleClick( 'save' ) }>Save</Button>
        </CardActions>
      </Card>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  movies: reduxStore.movies,
  selectedMovie: reduxStore.selectedMovie,

});

export default connect(putPropsOnReduxStore)(withStyles(styles)(EditPage));