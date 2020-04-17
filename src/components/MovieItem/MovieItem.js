import React, { Component } from 'react';
import './MovieItem.css';

// Gets each movie passed to it from the list page
// renders the title, poster, and description for each movie in a div
class MovieItem extends Component {
    render() {
        let movie = this.props.movie;
        return (
            <div className="movieDisplay">
                <h2>{ movie.title }</h2>
                <br />
                <div className="movieDisplay-Body">
                    <img src={ movie.poster } alt="POSTER" /> { movie.description }
                </div>
            </div>
        );
    }
}

export default MovieItem;