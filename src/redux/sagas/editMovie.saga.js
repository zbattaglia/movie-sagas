import { put } from 'redux-saga/effects';
import axios from 'axios';

// passes movie edits to server in PUT request
// after a successful put, calls fetch movie to update page with new data
function* editMovieSaga( action ) {
    console.log( 'In editMovieSaga', action );
    try{
        yield axios.put( `/movies/${action.payload.id}`, action.payload );
        yield put( { type: 'FETCH_MOVIE' } );
    }
    catch( error ){
        console.log( 'Error making PUT to server' );
    }
}; // end editMovieSaga

export default editMovieSaga;