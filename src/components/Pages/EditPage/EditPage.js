import React, { Component } from 'react';
import {connect} from 'react-redux';

class EditPage extends Component {

  // set initial state for capturing edits
  state = {
    id: this.props.selectedMovie,
    title: '',
    description: '',
  }; 

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
          <label>Edit Title:</label><input onChange={ ( event ) => this.handleChange( event, 'title' )}></input>
          <br />
          <label>Edit Description</label><input onChange={ ( event ) => this.handleChange( event, 'description' )}></input>
        </div>
        <button onClick={ (event) => this.handleClick( 'cancel' ) }>Cancel</button>
        <button onClick={ (event) => this.handleClick( 'save' ) }>Save</button>
      </div>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  selectedMovie: reduxStore.selectedMovie,

});

export default connect(putPropsOnReduxStore)(EditPage);