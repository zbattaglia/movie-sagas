import React, { Component } from 'react';
import {connect} from 'react-redux';

class GenresList extends Component {

    // The first item doesn't need a comma, but every genre after that requires a comma and space before it.
    // The display function just renders this in the correct format
    display(){
        let genreString = '';    
        for( let i = 0; i < this.props.genres.length; i++ ) {
            if ( i === 0 ){
                genreString += this.props.genres[i].name;
            }
            else {
                genreString += `, ${this.props.genres[i].name}`
            }
        }
        return genreString;
    }

    render() {
        return (
            <>{ this.display() }</>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  
  genres: reduxStore.genres,

});

export default connect(putPropsOnReduxStore)(GenresList);