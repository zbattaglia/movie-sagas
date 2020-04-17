import React, { Component } from 'react';
import {connect} from 'react-redux';

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

    return (
      <div className="edits">
        <div className="editField">
          <label>Edit Title:</label><input onChange={ ( event ) => this.handleChange( event, 'title' )} value={ this.state.title }></input>
          <br />
          <label>Edit Description</label><input onChange={ ( event ) => this.handleChange( event, 'description' )} value={ this.state.description }></input>
        </div>
        <button onClick={ (event) => this.handleClick( 'cancel' ) }>Cancel</button>
        <button onClick={ (event) => this.handleClick( 'save' ) }>Save</button>
      </div>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  movies: reduxStore.movies,
  selectedMovie: reduxStore.selectedMovie,

});

export default connect(putPropsOnReduxStore)(EditPage);