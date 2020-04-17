import React, { Component } from 'react';

class EditPage extends Component {

  // detect a button click
  handleClick = ( button ) => {
    console.log( 'Got button click', button );
    if( button === 'save' ) {
      console.log( 'Edits saved' );
    }
      this.props.history.push( '/details' );
  } // end handleClick

  render() {
    return (
      <div className="MovieList">
        <p>Make Edits Here</p>
        <button onClick={ (event) => this.handleClick( 'cancel' ) }>Cancel</button>
        <button onClick={ (event) => this.handleClick( 'save' ) }>Save</button>
      </div>
    );
  }
}

export default EditPage;