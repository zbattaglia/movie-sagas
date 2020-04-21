import { put } from 'redux-saga/effects';
import axios from 'axios';

// saga makes a get request for all genres associated with a specific movie id
function* getGenresSaga( action ) {
    console.log( 'In getGenresSaga', action );
    try{
        const response = yield axios.get( `/movies/genres/${action.payload}` );
        console.log( 'Got details', response );
        yield put( { type: 'SET_GENRES', payload: response.data } );
    }
    catch( error ){
        console.log( 'Error getting details', error );
    }
}; // end getDetailsSaga

export default getGenresSaga;