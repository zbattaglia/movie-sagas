import { put } from 'redux-saga/effects';
import axios from 'axios';

// saga makes request to get all the genres for each movie
function* getAllGenresSaga( action ) {
    console.log( 'In getAllGenresSaga', action );
    try{
        const response = yield axios.get( '/movies/genres' )
        console.log( 'Got all Genres', response.data );
        yield put( { type: 'SET_GENRES', payload: response.data } );
    }
    catch( error ) {
        console.log( 'Error gettig all genres', error );
    }
}

export default getAllGenresSaga;