import React, { Component } from 'react';

class DetailsPage extends Component {

  // event listener to detect click of either button
  handleClick = ( button ) => {
    // onClick push the target route to history to route to appropriate page
    console.log( 'Got a click on button', button )
    this.props.history.push( button );
  }; // end handleClick

  render() {
    return (
      <div className="MovieList">
        <p>Movie Details Go Here</p>
        <button onClick={ (event) => this.handleClick( '/list' ) }>Back to List</button>
        <button onClick={ (event) => this.handleClick( '/edit' ) }>Edit</button>
      </div>
    );
  }
}

export default DetailsPage;