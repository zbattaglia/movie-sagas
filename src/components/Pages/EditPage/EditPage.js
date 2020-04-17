import React, { Component } from 'react';

class EditPage extends Component {
  render() {
    return (
      <div className="MovieList">
        <p>Make Edits Here</p>
        <button>Cancel (back to details)</button>
        <button>Save (back to details)</button>
      </div>
    );
  }
}

export default EditPage;