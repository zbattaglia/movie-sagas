import { put } from 'redux-saga/effects';
import axios from 'axios';

// saga to make ajax GET request
function* getMovieSaga( action ) {
    console.log( 'In getMovieSaga', action );
    // gets the movies back as response, and sends the response to the movies reducer with the SET_MOVIES action
    try{
        const response = yield axios.get( `/movies` );
        yield put({type: 'SET_MOVIES', payload: response.data})
    }
    catch(error){
        console.log('Error with Search GET', error);
    }
}; // end getMovieSaga

export default getMovieSaga;